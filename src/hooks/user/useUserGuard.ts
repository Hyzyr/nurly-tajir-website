'use client';
import { supabase } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';

type Props = {
  redirectLink: string;
};

const useUserGuard = ({ redirectLink }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useLayoutEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) router.push(redirectLink);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return user;
};

export default useUserGuard;
