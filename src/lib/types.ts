export type CapsuleType = 'Message' | 'Goal' | 'Memory' | 'Secret';

export const MOODS = ['😊', '😂', '😢', '😡', '🤔', '🎉', '❤️'] as const;
export type Mood = typeof MOODS[number];

export interface Capsule {
  id: string;
  title: string;
  content: string;
  type: CapsuleType;
  unlockDate: string; // ISO 8601 string
  createdAt: string; // ISO 8601 string
  isLocked: boolean;
  tags: string[];
  mood: Mood | null;
}
