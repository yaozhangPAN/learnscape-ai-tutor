// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xfwnjocfdvuocvwjopke.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhmd25qb2NmZHZ1b2N2d2pvcGtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NDgwODIsImV4cCI6MjA1ODMyNDA4Mn0.gZLl8dXJxpZxzIxmkMEiHilUDUWQLwBwlDfnlTt-cl8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);