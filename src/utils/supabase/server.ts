import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;


export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}

/**
 * Fetch all rows from a given table, sorted by the specified column.
 * Logs any errors and returns an empty array on failure.
 */
export async function fetchAll<T>(
  table: string,
  sortBy: string = 'inserted_at',
  ascending: boolean = false
): Promise<T[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from<string, T>(table) // ← now supplying both generics
    .select('*')
    .order(sortBy, { ascending });

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
