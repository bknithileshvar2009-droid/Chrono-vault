'use client';

import { useApp } from '@/hooks/use-app';
import { NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { CreateCapsuleSheet } from '@/components/capsules/CreateCapsuleSheet';

export function BottomNav() {
  const { activeTab, setActiveTab } = useApp();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <footer className="fixed bottom-0 left-0 z-50 h-20 w-full glass-nav">
        <div className="grid h-full grid-cols-5 items-center">
          {NAV_ITEMS.slice(0, 2).map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex h-full flex-col items-center justify-center gap-1"
            >
              <item.icon
                className={cn(
                  'h-6 w-6 transition-colors',
                  activeTab === item.id ? 'text-accent' : 'text-muted-foreground'
                )}
              />
              <span
                className={cn(
                  'text-xs transition-colors',
                  activeTab === item.id ? 'text-accent' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </span>
            </button>
          ))}

          <div className="flex justify-center">
             <Button 
                size="icon" 
                className="h-16 w-16 -translate-y-6 rounded-full bg-primary shadow-lg shadow-primary/30 ring-8 ring-background"
                onClick={() => setIsCreateOpen(true)}
              >
                <Plus className="h-8 w-8" />
             </Button>
          </div>

          {NAV_ITEMS.slice(2, 4).map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex h-full flex-col items-center justify-center gap-1"
            >
              <item.icon
                className={cn(
                  'h-6 w-6 transition-colors',
                  activeTab === item.id ? 'text-accent' : 'text-muted-foreground'
                )}
              />
              <span
                className={cn(
                  'text-xs transition-colors',
                  activeTab === item.id ? 'text-accent' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </footer>
      <CreateCapsuleSheet open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </>
  );
}
