import { DEFAULT_STORAGE_KEY } from '@/constants';
import { IUser } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  accessToken?: string;
  refreshToken?: string | null;
  user?: IUser;
  login: (tokens: { accessToken: string; refreshToken: string | null }) => void;
  logout: () => void;
  setToken: (token?: string) => void;
  setUser: (user?: IUser) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      login: (tokens) => {
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        });
      },
      setToken: (token) => {
        set({ accessToken: token });
      },
      setUser: (user) => {
        set({ user });
      },
      logout: () => {
        set({ accessToken: undefined, refreshToken: null, user: undefined });
      },
    }),
    {
      name: DEFAULT_STORAGE_KEY.AUTH_STORE,
      partialize: (data) => ({ ...data }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
