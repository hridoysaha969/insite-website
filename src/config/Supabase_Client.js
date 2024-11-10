import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://qixbqsieqvheisakarwm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpeGJxc2llcXZoZWlzYWthcndtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExMjk5ODQsImV4cCI6MjA0NjcwNTk4NH0.Eba2BTpy5tM4-IHniXJHrtn6CbK4HrTeYhchLt4TMPY"
);
