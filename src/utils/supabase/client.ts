// lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log({
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
});
export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

/**
 * Fetch all rows from a given table, sorted by the specified column.
 * Logs any errors and returns an empty array on failure.
 */
export async function fetchAll<T>(
  table: string,
  sortBy: string = 'inserted_at',
  ascending: boolean = false
): Promise<T[]> {
  const { data, error } = await supabase
    .from<string, T>(table) // ← now supplying both generics
    .select('*')
    .order(sortBy, { ascending });
  console.log({ data });

  if (error) {
    console.error(`❌ [Supabase] error fetching "${table}":`, error);

    console.error('❌ Supabase error:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    
    return [];
  }

  return data ?? [];
}
