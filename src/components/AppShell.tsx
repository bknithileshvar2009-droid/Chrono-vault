'use client';

import { useApp } from '@/hooks/use-app';
import { MainUI } from '@/components/MainUI';
import { Clock } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

export function AppShell() {
  const { isInitialized, isAuthenticated } = useApp();

  if (!isInitialized) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground">
        <Clock className="h-12 w-12 animate-spin text-accent" />
        <p className="mt-4 text-lg font-medium">Initializing {APP_NAME}...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground p-4 text-center">
        <p className="text-lg font-medium text-destructive">Failed to connect to the service.</p>
        <p className="text-muted-foreground mt-2">Please check your connection and try refreshing the page.</p>
      </div>
    );
  }

  return <MainUI />;
}
