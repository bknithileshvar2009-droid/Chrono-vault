'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useApp } from '@/hooks/use-app';
import { useToast } from '@/hooks/use-toast';
import { CapsuleType, MOODS, Mood } from '@/lib/types';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { CalendarIcon, Smile } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const capsuleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  content: z.string().min(1, 'Content is required'),
  type: z.enum(['Message', 'Goal', 'Memory', 'Secret']),
  unlockDate: z.date().min(new Date(), { message: 'Unlock date must be in the future.' }),
  tags: z.string().optional(),
  mood: z.string().optional(),
});

type CapsuleFormData = z.infer<typeof capsuleSchema>;

interface CreateCapsuleSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCapsuleSheet({ open, onOpenChange }: CreateCapsuleSheetProps) {
  const { addCapsule } = useApp();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CapsuleFormData>({
    resolver: zodResolver(capsuleSchema),
    defaultValues: {
      type: 'Message',
      unlockDate: new Date(Date.now() + 86400000), // Default to 24 hours from now
    },
  });

  const onSubmit = (data: CapsuleFormData) => {
    addCapsule({
      ...data,
      unlockDate: data.unlockDate.toISOString(),
      tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      mood: data.mood as Mood || null
    });
    toast({
      title: 'Capsule Sealed!',
      description: `Your ${data.type} will unlock on ${format(data.unlockDate, 'PPP')}.`,
    });
    reset();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] glass-card flex flex-col">
        <SheetHeader>
          <SheetTitle>Create a New Time Capsule</SheetTitle>
          <SheetDescription>
            Seal a message, goal, memory, or secret for your future self.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto space-y-4 px-1 py-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register('title')} />
            {errors.title && <p className="text-destructive text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" {...register('content')} rows={5} />
            {errors.content && <p className="text-destructive text-sm mt-1">{errors.content.message}</p>}
          </div>

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <div>
                <Label>Type</Label>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-2 mt-2">
                  {(['Message', 'Goal', 'Memory', 'Secret'] as CapsuleType[]).map(type => (
                    <Label key={type} className="flex items-center space-x-2 rounded-md border p-3 has-[:checked]:border-primary glass-card">
                      <RadioGroupItem value={type} id={type} />
                      <span>{type}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            )}
          />

          <Controller
            name="unlockDate"
            control={control}
            render={({ field }) => (
                <div>
                  <Label>Unlock Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  {errors.unlockDate && <p className="text-destructive text-sm mt-1">{errors.unlockDate.message}</p>}
                </div>
            )}
          />
          
          <div className='flex gap-4'>
            <div className='flex-1'>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input id="tags" {...register('tags')} />
            </div>
            
            <Controller
              name="mood"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>Mood</Label>
                   <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon" className="w-10 h-10 mt-2">
                        {field.value ? <span className="text-xl">{field.value}</span> : <Smile className="h-4 w-4" />}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-2">
                        <div className="grid grid-cols-4 gap-2">
                            {MOODS.map(mood => (
                                <Button key={mood} variant="ghost" size="icon" onClick={() => field.onChange(mood)} className={cn('text-2xl', field.value === mood && 'bg-accent')}>
                                    {mood}
                                </Button>
                            ))}
                        </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            />
          </div>

          <SheetFooter className="pt-4 sticky bottom-0 bg-transparent">
            <Button type="submit" className="w-full">Seal Capsule</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
