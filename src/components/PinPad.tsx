'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Delete } from 'lucide-react';
import { PIN_LENGTH } from '@/lib/constants';

interface PinPadProps {
  onPinComplete: (pin: string) => void;
  onPinChange: (pin: string) => void;
}

export function PinPad({ onPinComplete, onPinChange }: PinPadProps) {
  const [pin, setPin] = useState('');

  useEffect(() => {
    onPinChange(pin);
    if (pin.length === PIN_LENGTH) {
      onPinComplete(pin);
      setPin('');
    }
  }, [pin, onPinComplete, onPinChange]);

  const handlePress = (num: string) => {
    if (pin.length < PIN_LENGTH) {
      setPin(pin + num);
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const numbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {numbers.flat().map(num => (
        <Button
          key={num}
          variant="outline"
          className="h-20 w-20 rounded-full border-2 text-3xl font-bold"
          onClick={() => handlePress(num)}
        >
          {num}
        </Button>
      ))}
      <div />
      <Button
        variant="outline"
        className="h-20 w-20 rounded-full border-2 text-3xl font-bold"
        onClick={() => handlePress('0')}
      >
        0
      </Button>
      <Button
        variant="ghost"
        className="h-20 w-20 rounded-full"
        onClick={handleBackspace}
        aria-label="Backspace"
      >
        <Delete className="h-8 w-8" />
      </Button>
    </div>
  );
}
