'use client';
import useUserGuard from '@/hooks/user/useUserGuard';
import React, { PropsWithChildren } from 'react';

const AdminGuard = ({ children }: PropsWithChildren) => {
  const user = useUserGuard({ redirectLink: '/' });

  return user ? <>{children}</> : null;
};

export default AdminGuard;
