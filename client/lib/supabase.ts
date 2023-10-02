import { createClient } from "@supabase/supabase-js";

const supaURL=process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supaKey=process.env.NEXT_PUBLIC_SUPABASE_KEY || "";



export const supabase = createClient(supaURL, supaKey);