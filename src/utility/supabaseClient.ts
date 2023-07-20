import { createClient } from "@refinedev/supabase";

// const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "";
// const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY ?? "";

export const supabaseClient = createClient(
  "https://chqiegtviyqwkepxcgiw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNocWllZ3R2aXlxd2tlcHhjZ2l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg0ODc4MDAsImV4cCI6MjAwNDA2MzgwMH0.8BwgKJQ48X_R5Wd_aBwPNG8esZt6dCb0LdLnt7pFaKk",
  {
    db: {
      schema: "public",
    },
    auth: {
      persistSession: true,
    },
  }
);
