// src/utils/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import type { Database } from '@/utils/supabase/database.types';
import { cookies } from 'next/headers';

// ---- Shared table helper types ----
type Tables = Database['public']['Tables'];
type TableName = keyof Tables;
type Row<T extends TableName> = Tables[T]['Row'];
type InsertFor<T extends TableName> = Tables[T]['Insert'];
type UpdateFor<T extends TableName> = Tables[T]['Update'];
type TablesWithId = { [K in TableName]: 'id' extends keyof Row<K> ? K : never }[TableName];
type IdType<T extends TablesWithId> = Row<T>['id'];

// IMPORTANT: make this async so we can await cookies() in Next 15+
async function getServerSupabase() {
  const cookieStore = await cookies();

  // NOTE: don't over-annotate the return type. Let it infer.
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Newer @supabase/ssr expects getAll/setAll (not headers, and not get/set/remove)
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            // Next's cookies().set accepts an object
            cookieStore.set({ name, value, ...(options ?? {}) });
          }
        },
      },
    }
  );
}

// ---- Typed helpers (server) ----
// Use await getServerSupabase() in each function to bind to the current request.

export async function fetchAll<T extends TableName>(
  table: T,
  sortBy?: keyof Row<T> & string,
  ascending = false
): Promise<Row<T>[]> {
  const supabase = await getServerSupabase();
  const base = supabase.from(table).select<'*', Row<T>>('*');
  const query = sortBy ? base.order(sortBy, { ascending }) : base;
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

// export async function fetchById<T extends TablesWithId>(
//   table: T,
//   id: IdType<T>
// ): Promise<Row<T> | null> {
//   const supabase = await getServerSupabase();
//   const { data, error } = await supabase
//     .from(table)
//     .select<'*', Row<T>>('*')
//     .eq('id', id)           // prefer eq over match for tighter types
//     .single();
//   if (error) throw error;
//   return data ?? null;
// }

// export async function createRow<T extends TableName>(
//   table: T,
//   payload: InsertFor<T>
// ): Promise<Row<T> | null> {
//   const supabase = await getServerSupabase();
//   const { data, error } = await supabase
//     .from(table)
//     .insert(payload)
//     .select<'*', Row<T>>('*')
//     .single();
//   if (error) throw error;
//   return data ?? null;
// }

// export async function updateById<T extends TablesWithId>(
//   table: T,
//   id: IdType<T>,
//   updates: UpdateFor<T>
// ): Promise<Row<T>> {
//   const supabase = await getServerSupabase();
//   const { data, error } = await supabase
//     .from(table)
//     .update(updates)
//     .eq('id', id)
//     .select<'*', Row<T>>('*')
//     .single();
//   if (error) throw error;
//   return data;
// }

// export async function deleteById<T extends TablesWithId>(
//   table: T,
//   id: IdType<T>
// ): Promise<boolean> {
//   const supabase = await getServerSupabase();
//   const { error } = await supabase.from(table).delete().eq('id', id);
//   if (error) throw error;
//   return true;
// }


