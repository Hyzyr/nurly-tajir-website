// lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase: SupabaseClient = createBrowserClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

export async function fetchAll<T>(
  table: string,
  sortBy: string = 'inserted_at',
  ascending: boolean = false
): Promise<T[]> {
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

export async function updateById<T>(
  table: string,
  id: string | number,
  updates: Partial<T>
): Promise<T[]> {
  console.log('Updating', { table, id, updates });
  const { data, error } = await supabase
    .from<string, T>(table)
    .update(updates as any)
    .eq('id', id as any)
    .select('*');
  // .maybeSingle();

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
export async function create<T>(
  table: string,
  payload: Partial<T>
): Promise<T | null> {
  const { data, error } = await supabase
    .from<string, T>(table)
    .insert(payload as any)
    .select('*')
    .single();

  if (error) {
    console.error(`❌ [Supabase] error creating "${table}":`, error);

    console.error('❌ Supabase error:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    return null;
  }

  return data ?? null;
}
export async function fetchById<T>(
  table: string,
  id: string | number
): Promise<T | null> {
  const { data, error } = await supabase
    .from<string, T>(table)
    .select('*')
    .eq('id', id as any)
    .single();

  if (error) {
    console.error(`❌ [Supabase] error fetching by ID from "${table}":`, error);

    console.error('❌ Supabase error:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    return null;
  }

  return data ?? null;
}
export async function deleteById<T>(
  table: string,
  id: string | number
): Promise<boolean> {
  const { error } = await supabase
    .from<string, T>(table)
    .delete()
    .eq('id', id as any);

  if (error) {
    console.error(`❌ [Supabase] error deleting from "${table}":`, error);

    console.error('❌ Supabase error:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    return false;
  }

  return true;
}
