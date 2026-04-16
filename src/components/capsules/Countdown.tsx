'use client';

import { useState, useEffect } from 'react';

interface CountdownProps {
  unlockDate: string;
}

export function Countdown({ unlockDate }: CountdownProps) {
  const calculateTimeLeft = () => {
    const difference = +new Date(unlockDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft as { days: number, hours: number, minutes: number, seconds: number };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });
  
  const timerComponents: JSX.Element[] = [];

  Object.entries(timeLeft).forEach(([interval, value]) => {
    if (value > 0) {
      timerComponents.push(
        <div key={interval} className="flex flex-col items-center">
            <span className="font-mono text-xl font-bold text-accent">{String(value).padStart(2, '0')}</span>
            <span className="text-xs text-muted-foreground">{interval.charAt(0).toUpperCase()}</span>
        </div>
      );
    }
  });


  return (
    <div className="flex space-x-3">
        {timerComponents.length ? timerComponents : <span className="font-mono text-xl font-bold text-accent">Unlocking...</span>}
    </div>
  );
}
