'use client';

import { AppContextProvider } from '@/context/AppContext';
import { ReactNode } from 'react';

export function AppProvider({ children }: { children: ReactNode }) {
  return <AppContextProvider>{children}</AppContextProvider>;
}
