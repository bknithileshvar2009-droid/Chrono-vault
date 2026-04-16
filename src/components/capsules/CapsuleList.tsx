'use client';

import { Capsule } from '@/lib/types';
import { CapsuleCard } from './CapsuleCard';

interface CapsuleListProps {
  capsules: Capsule[];
}

export function CapsuleList({ capsules }: CapsuleListProps) {
  if (capsules.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        No capsules here yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {capsules.map(capsule => (
        <CapsuleCard key={capsule.id} capsule={capsule} />
      ))}
    </div>
  );
}
