'use client';

import { AppContext } from '@/context/app.context';
import { useGetMe } from '@/services/v1/user/me';
import useAuthStore from '@/store/authStore';
import { useEffect } from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isSuccess } = useGetMe({
    params: {},
  });

  const setUser = useAuthStore((store) => store?.setUser);

  useEffect(() => {
    if (isSuccess) {
      setUser(data);
    }
  }, [isSuccess]);

  return (
    <AppContext.Provider value={{ loading: isLoading }}>
      {children}
    </AppContext.Provider>
  );
}
