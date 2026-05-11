/**
 * Database type definitions.
 * Generate automatically with: npx supabase gen types typescript --project-id <id> > src/types/database.ts
 * The types below represent the expected schema — update after running migrations.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;                   // references auth.users.id
          email: string;
          full_name: string | null;
          company: string | null;
          avatar_url: string | null;
          stripe_customer_id: string | null;
          subscription_status: SubscriptionStatus | null;
          subscription_tier: SubscriptionTier | null;
          subscription_period_end: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          company?: string | null;
          avatar_url?: string | null;
          stripe_customer_id?: string | null;
          subscription_status?: SubscriptionStatus | null;
          subscription_tier?: SubscriptionTier | null;
          subscription_period_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          status: "new" | "read" | "replied";
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          status?: "new" | "read" | "replied";
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["contact_submissions"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      subscription_status: SubscriptionStatus;
      subscription_tier: SubscriptionTier;
    };
  };
}

export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "incomplete";

export type SubscriptionTier = "starter" | "pro" | "enterprise";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ContactSubmission = Database["public"]["Tables"]["contact_submissions"]["Row"];
