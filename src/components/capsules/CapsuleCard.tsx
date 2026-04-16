'use client';

import { Capsule } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Unlock, Clock, Tag, Smile } from 'lucide-react';
import { Countdown } from './Countdown';
import { Badge } from '../ui/badge';
import { motion } from 'framer-motion';

interface CapsuleCardProps {
  capsule: Capsule;
}

export function CapsuleCard({ capsule }: CapsuleCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-card overflow-hidden">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="font-headline text-lg font-bold">{capsule.title}</CardTitle>
              <CardDescription className="flex items-center gap-1.5 text-xs">
                {capsule.isLocked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                <span>{capsule.type}</span>
              </CardDescription>
            </div>
            {capsule.mood && <span className="text-2xl">{capsule.mood}</span>}
          </div>
        </CardHeader>
        <CardContent>
          {capsule.isLocked ? (
            <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border-2 border-dashed border-border bg-background/50 p-6">
              <Clock className="h-8 w-8 text-accent" />
              <p className="text-sm font-medium">Unlocks in:</p>
              <Countdown unlockDate={capsule.unlockDate} />
            </div>
          ) : (
            <p className="whitespace-pre-wrap text-sm text-foreground/80">{capsule.content}</p>
          )}
        </CardContent>
        {(capsule.tags.length > 0 || !capsule.isLocked) && (
            <CardFooter className="flex-wrap gap-2">
                {capsule.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                        <Tag className="h-3 w-3"/>{tag}
                    </Badge>
                ))}
            </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
