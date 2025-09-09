'use client';

import React, { useState } from 'react';
import styles from './styles.module.scss';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Input from '@/UI/components/form/Input';
import Button from '@/UI/components/Button';
import Image from 'next/image';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);
  const [fetching, setFetching] = useState(false);
  const router = useRouter();

  const login = async () => {
    setFetching(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setFetching(false);
    if (error) setError(error.message);
    else router.push('/admin/dashboard');
  };

  return (
    <div className={styles.auth__wrapper}>
      <div className={styles.auth}>
        <div className="logo fbox fbox-justify-center">
          <Image src="/images/favicon.svg" alt="" width={50} height={50} />
        </div>
        <div className={styles.auth__body}>
          <h4 className="h6 color-primary">Login</h4>
          <strong className="subtitle _sm color-gray">to admin panel</strong>
          <form className={styles.auth__body__form} autoComplete="off">
            <Input
              placeholder="username"
              autoComplete="new-user"
              value={email}
              disabled={fetching}
              onChange={(e) => {
                setError(null);
                setEmail(e.target?.value);
              }}
            />
            <Input
              placeholder="password"
              type="password"
              autoComplete="new-password"
              value={password}
              disabled={fetching}
              onChange={(e) => {
                setError(null);
                setPassword(e.target?.value);
              }}
            />
            {error && <p className="color-red">{error}</p>}
          </form>
          <Button disabled={fetching} text="Submit" onClick={login} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
