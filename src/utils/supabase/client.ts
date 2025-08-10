import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/utils/supabase/database.types';

type Tables = Database['public']['Tables'];
type TableName = keyof Tables;

type Row<T extends TableName> = Tables[T]['Row'];
type InsertFor<T extends TableName> = Tables[T]['Insert'];
type UpdateFor<T extends TableName> = Tables[T]['Update'];

type TablesWithId = {
  [K in TableName]: 'id' extends keyof Row<K> ? K : never;
}[TableName];
type IdType<T extends TablesWithId> = Row<T>['id'];

export const supabase: SupabaseClient<Database> = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function fetchAll<T extends TableName>(
  table: T,
  sortBy?: keyof Row<T> & string,
  ascending = false
): Promise<Row<T>[]> {
  const base = supabase.from(table).select<'*', Row<T>>('*'); // <- type result here
  const query = sortBy ? base.order(sortBy, { ascending }) : base;
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function updateById<T extends TableName>(
  table: T,
  id: IdType<T>,
  updates: UpdateFor<T>
): Promise<Row<T>> {
  const { data, error } = await supabase
    .from(table as TableName)
    .update(updates)
    .match({ id } as Pick<Row<T>, 'id'>)
    .select('*');

  if (error) throw error;
  return data[0];
}

export async function createRow<T extends TableName>(
  table: T,
  payload: InsertFor<T>
): Promise<Row<T> | null> {
  const { data, error } = await supabase
    .from(table as TableName)
    .insert(payload)
    .select<'*', Row<T>>('*')
    .single();

  if (error) throw error;
  return data ?? null;
}

export async function fetchById<T extends TablesWithId>(
  table: T,
  id: IdType<T>
): Promise<Row<T> | null> {
  const { data, error } = await supabase
    .from(table)
    .select<'*', Row<T>>('*')
    .match({ id } as Pick<Row<T>, 'id'>)
    .single();

  if (error) throw error;
  return data ?? null;
}
export async function deleteById<T extends TablesWithId>(
  table: T,
  id: IdType<T>
): Promise<boolean> {
  const { error } = await supabase
    .from(table)
    .delete()
    .match({ id } as Pick<Row<T>, 'id'>);
  if (error) throw error;
  return true;
}
