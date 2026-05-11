# SINTRICS — Setup Guide

Complete setup from zero to production. Takes ~30 minutes.

---

## 1. Prerequisites

```bash
node -v   # 18+
npm -v    # 9+
```

---

## 2. Supabase

### Create project
1. Go to [supabase.com](https://supabase.com) → New project
2. Choose a region close to your users (e.g. **West EU** for Slovakia)
3. Save the database password — you won't see it again

### Get API keys
`Settings → API`:
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role** → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ never expose client-side

### Run migrations
`SQL Editor → New query` → paste contents of `supabase/migrations/001_initial_schema.sql` → Run

### Configure auth
`Authentication → URL Configuration`:
- **Site URL**: `https://sintrics.ai`
- **Redirect URLs**: `https://sintrics.ai/api/auth/callback`

For development, also add: `http://localhost:3000/api/auth/callback`

### Enable OAuth providers (optional)
`Authentication → Providers`:
- **Google**: requires OAuth credentials from Google Cloud Console
- **GitHub**: requires OAuth App from GitHub Settings → Developer settings

---

## 3. Stripe

### Create products
`Stripe Dashboard → Products → Add product`:

| Product | Price | Billing |
|---------|-------|---------|
| Starter | €49 | Monthly recurring |
| Pro | €149 | Monthly recurring |
| Enterprise | €499 | Monthly recurring |

Copy the **Price ID** (starts with `price_`) for each — these go into `.env.local`.

### Get API keys
`Developers → API keys`:
- **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Secret key** → `STRIPE_SECRET_KEY`

### Set up webhook
`Developers → Webhooks → Add endpoint`:
- **URL**: `https://sintrics.ai/api/stripe/webhook`
- **Events to listen to**:
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_failed`

Copy the **Signing secret** → `STRIPE_WEBHOOK_SECRET`

### Local webhook testing
```bash
npm install -g stripe
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
# Copy the webhook signing secret it prints → STRIPE_WEBHOOK_SECRET for local dev
```

### Configure Customer Portal
`Settings → Billing → Customer portal`:
- Enable cancellation, plan switching, and payment method updates

---

## 4. Resend

1. Go to [resend.com](https://resend.com) → Create account
2. `API Keys → Create API key` → `RESEND_API_KEY`
3. `Domains → Add domain` → verify your domain (adds DNS records)
4. Set `RESEND_FROM_EMAIL` to an address on your verified domain

---

## 5. Local development

```bash
# Clone and install
git clone https://github.com/your-org/sintrics
cd sintrics
npm install

# Configure environment
cp .env.local.example .env.local
# Fill in all values from steps 2–4 above

# Run
npm run dev
# → http://localhost:3000
```

---

## 6. GitHub repository

```bash
cd sintrics
git init
git add .
git commit -m "Initial commit"
git branch -M main

# Create repo at github.com/new, then:
git remote add origin https://github.com/your-org/sintrics.git
git push -u origin main
```

---

## 7. Vercel deployment

### Connect
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repository
3. Framework preset: **Next.js** (auto-detected)

### Environment variables
In Vercel project → Settings → Environment Variables, add **all** variables from `.env.local.example`.

Set `NEXT_PUBLIC_APP_URL` to your production URL (e.g. `https://sintrics.ai`).

For preview deployments, set a separate `NEXT_PUBLIC_APP_URL` that matches the Vercel preview URL pattern.

### Deploy
Push to `main` → Vercel deploys automatically.

### Custom domain
`Settings → Domains → Add` → follow DNS instructions.

---

## 8. Post-deployment checklist

- [ ] Test signup + email confirmation flow
- [ ] Test magic link login
- [ ] Test Stripe checkout (use card `4242 4242 4242 4242`)
- [ ] Verify webhook events appear in Stripe Dashboard
- [ ] Confirm subscription confirmation email arrives (Resend logs)
- [ ] Test contact form → check Supabase `contact_submissions` table
- [ ] Verify CI passes on GitHub Actions
- [ ] Set up Vercel environment variables for production

---

## Regenerating database types

After schema changes, regenerate TypeScript types:

```bash
npx supabase gen types typescript \
  --project-id your-project-id \
  > src/types/database.ts
```

---

## Architecture overview

```
src/
├── app/
│   ├── (auth)/              # Login, signup, auth-error pages
│   ├── api/
│   │   ├── auth/callback/   # Supabase OAuth/magic link handler
│   │   ├── contact/         # Contact form → Supabase + Resend
│   │   └── stripe/
│   │       ├── checkout/    # Create Stripe checkout session
│   │       ├── portal/      # Open Stripe billing portal
│   │       └── webhook/     # Handle all subscription events
│   ├── billing/             # Pricing page + subscription management
│   └── dashboard/           # Protected user dashboard
├── components/              # All page sections (Navigation, Hero, etc.)
├── lib/
│   ├── email.ts             # All Resend email functions
│   ├── env.ts               # Environment validation
│   ├── stripe.ts            # Stripe utilities
│   └── supabase/
│       ├── client.ts        # Browser Supabase client
│       ├── middleware.ts     # Session refresh + route protection
│       └── server.ts        # Server Supabase client + admin client
├── middleware.ts             # Next.js middleware entry
└── types/
    └── database.ts          # Supabase schema types
```
