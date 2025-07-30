import { supabase } from '@/utils/supabase/client';
import React from 'react';

const page = async () => {
  const data = await supabase.from('services').select();
  console.log('data : \n', data);

  return <pre>{JSON.stringify(data.data, null, 2)}</pre>;
};

export default page;
