'use client';

import { useState } from 'react';
import { useApp } from '@/hooks/use-app';
import { PinPad } from '@/components/PinPad';
import { APP_NAME, PIN_LENGTH } from '@/lib/constants';
import { SpiderIcon } from '@/components/icons/SpiderIcon';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function LockScreen() {
  const { login, setPin, pin } = useApp();
  const { toast } = useToast();
  const [pinInput, setPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const isSettingPin = !pin;

  const handlePinComplete = (newPin: string) => {
    if (isSettingPin) {
      if (!isConfirming) {
        setPinInput(newPin);
        setIsConfirming(true);
      } else {
        if (pinInput === newPin) {
          setPin(newPin);
          toast({
            title: 'PIN Set',
            description: 'Your ChronoVault is now secure.',
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'PINs do not match',
            description: 'Please try again.',
          });
          setIsConfirming(false);
          setPinInput('');
          triggerShake();
        }
      }
    } else {
      // Logging in
      const success = login(newPin);
      if (!success) {
        toast({
          variant: 'destructive',
          title: 'Incorrect PIN',
        });
        triggerShake();
      }
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 820);
  };

  const getTitle = () => {
    if (isSettingPin) {
      return isConfirming ? 'Confirm Your PIN' : 'Set a New PIN';
    }
    return 'Enter Your PIN';
  };
  
  const currentPinLength = isConfirming ? confirmPinInput.length : pinInput.length;


  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
          <SpiderIcon className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">{getTitle()}</h1>
        <p className="text-muted-foreground">{APP_NAME}</p>
      </div>

      <div className={cn('my-8 flex space-x-4', isShaking && 'animate-shake')}>
        {Array.from({ length: PIN_LENGTH }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-4 w-4 rounded-full border-2 border-accent transition-colors',
              i < currentPinLength ? 'bg-accent' : 'bg-transparent'
            )}
          />
        ))}
      </div>

      <PinPad
        onPinComplete={handlePinComplete}
        onPinChange={isConfirming ? setConfirmPinInput : setPinInput}
      />
    </div>
  );
}
