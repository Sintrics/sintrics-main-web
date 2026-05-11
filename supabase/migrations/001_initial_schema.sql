-- ═══════════════════════════════════════════════
--  SINTRICS — Supabase Schema Migration
--  Run this in: Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════

-- ── Enums ────────────────────────────────────────────────────────────

create type subscription_status as enum (
  'active', 'trialing', 'past_due', 'canceled', 'incomplete'
);

create type subscription_tier as enum (
  'starter', 'pro', 'enterprise'
);

-- ── Profiles ─────────────────────────────────────────────────────────
-- Extends auth.users with app-specific fields.
-- Created automatically via trigger on signup.

create table public.profiles (
  id                      uuid primary key references auth.users(id) on delete cascade,
  email                   text not null,
  full_name               text,
  company                 text,
  avatar_url              text,
  stripe_customer_id      text unique,
  subscription_status     subscription_status,
  subscription_tier       subscription_tier,
  subscription_period_end timestamptz,
  created_at              timestamptz default now() not null,
  updated_at              timestamptz default now() not null
);

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Row-Level Security ───────────────────────────────────────────────

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Service role bypasses RLS — used by Stripe webhook handler

-- ── Contact Submissions ──────────────────────────────────────────────

create table public.contact_submissions (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  message    text not null,
  status     text not null default 'new' check (status in ('new', 'read', 'replied')),
  created_at timestamptz default now() not null
);

alter table public.contact_submissions enable row level security;

-- Only service role (webhook/admin) can read submissions
-- Anonymous users can insert (contact form)
create policy "Anyone can submit contact form"
  on public.contact_submissions for insert
  with check (true);

-- ── Indexes ──────────────────────────────────────────────────────────

create index profiles_stripe_customer_id_idx on public.profiles(stripe_customer_id);
create index profiles_subscription_status_idx on public.profiles(subscription_status);
create index contact_submissions_status_idx on public.contact_submissions(status);
create index contact_submissions_created_at_idx on public.contact_submissions(created_at desc);
