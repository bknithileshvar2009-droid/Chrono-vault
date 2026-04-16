'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/hooks/use-app';
import { CapsuleList } from '../capsules/CapsuleList';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CapsuleType } from '@/lib/types';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Label } from '../ui/label';

export function TimelineTab() {
  const { capsules } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<CapsuleType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'locked' | 'unlocked'>('all');

  const filteredCapsules = useMemo(() => {
    return capsules
      .filter(capsule => {
        const searchMatch =
          searchTerm.trim() === '' ||
          capsule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          capsule.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          capsule.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const typeMatch = filterType === 'all' || capsule.type === filterType;
        
        const statusMatch = 
          filterStatus === 'all' ||
          (filterStatus === 'locked' && capsule.isLocked) ||
          (filterStatus === 'unlocked' && !capsule.isLocked);

        return searchMatch && typeMatch && statusMatch;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [capsules, searchTerm, filterType, filterStatus]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Timeline</h1>
        <p className="text-muted-foreground">A record of your past and future.</p>
      </header>

      <div className="sticky top-4 z-10 flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search capsules..."
            className="pl-10"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 space-y-4">
            <h4 className="font-medium leading-none">Filters</h4>
            <div className="grid gap-2">
                <Label>Status</Label>
                <Select value={filterStatus} onValueChange={(v: any) => setFilterStatus(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="locked">Locked</SelectItem>
                    <SelectItem value="unlocked">Unlocked</SelectItem>
                  </SelectContent>
                </Select>
            </div>
             <div className="grid gap-2">
                <Label>Type</Label>
                <Select value={filterType} onValueChange={(v: any) => setFilterType(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Message">Message</SelectItem>
                    <SelectItem value="Goal">Goal</SelectItem>
                    <SelectItem value="Memory">Memory</SelectItem>
                    <SelectItem value="Secret">Secret</SelectItem>
                  </SelectContent>
                </Select>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {filteredCapsules.length > 0 ? (
        <CapsuleList capsules={filteredCapsules} />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center glass-card">
          <h3 className="text-xl font-semibold">No Capsules Found</h3>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search or filters, or create a new capsule.
          </p>
        </div>
      )}
    </div>
  );
}
