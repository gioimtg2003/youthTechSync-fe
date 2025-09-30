import { createContext, useContext } from 'react';

type AppContextType = {
  loading: boolean;
};

export const AppContext = createContext<AppContextType | null>(null);

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within Layout');
  return ctx;
}
