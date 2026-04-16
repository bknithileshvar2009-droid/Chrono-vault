'use client';

import { useApp } from '@/hooks/use-app';
import { APP_NAME } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Package, GitCommitHorizontal, Flame } from 'lucide-react';
import { CreateCapsuleSheet } from '@/components/capsules/CreateCapsuleSheet';
import { useState } from 'react';
import { Button } from '../ui/button';
import { CapsuleList } from '../capsules/CapsuleList';

export function HomeTab() {
  const { capsules, getStreak, setActiveTab } = useApp();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const now = new Date();
  const upcomingCapsules = capsules
    .filter(c => c.isLocked && new Date(c.unlockDate) > now)
    .sort((a, b) => new Date(a.unlockDate).getTime() - new Date(b.unlockDate).getTime())
    .slice(0, 3);
  
  const unlockedCount = capsules.filter(c => !c.isLocked).length;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
        <p className="text-muted-foreground">This is your {APP_NAME}.</p>
      </header>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capsules</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{capsules.length}</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unlocked</CardTitle>
            <GitCommitHorizontal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unlockedCount}</div>
          </CardContent>
        </Card>
        <Card className="glass-card col-span-2 md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Writing Streak</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStreak()} Days</div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Unlocking Soon</h2>
          <Button variant="ghost" onClick={() => setActiveTab('timeline')}>View all</Button>
        </div>
        {upcomingCapsules.length > 0 ? (
          <div className="mt-2 space-y-4">
             <CapsuleList capsules={upcomingCapsules} />
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center glass-card">
            <p className="text-muted-foreground">No upcoming capsules.</p>
            <Button className="mt-4" onClick={() => setIsCreateOpen(true)}>Create a New Capsule</Button>
          </div>
        )}
      </div>

      <CreateCapsuleSheet open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </div>
  );
}
