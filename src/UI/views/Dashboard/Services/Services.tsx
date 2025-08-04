import { Service } from '@/types/supabase';
import { createClient } from '@/utils/supabase/server';

export default async function ServicesPage() {
  // 1) Create the Supabase client bound to the incoming cookies
  const supabase = await createClient();

  // 2) Run your query
  const { data: services, error } = await supabase
    .from<string, Service>('services')
    .select('*');

  // 3) Handle errors or render your data
  if (error) {
    console.error('❌ Supabase error fetching services:', error);
    return <p>Error loading services.</p>;
  }

  return (
    <ul>
      {services?.map((svc) => (
        <li key={svc.id}>{svc.title_en /* or however you render */}</li>
      ))}
    </ul>
  );
}
