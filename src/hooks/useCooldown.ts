import { useState } from 'react';

export const useCooldown = (cooldownMs: number = 60_000) => {
  const [lastTimes, setLastTimes] = useState<Record<string, number>>({});

  const isOnCooldown = (id: string | number) => {
    const now = Date.now();
    const last = lastTimes[id] || 0;
    return now - last < cooldownMs;
  };

  const getRemaining = (id: string | number) => {
    const now = Date.now();
    const last = lastTimes[id] || 0;
    return Math.ceil((cooldownMs - (now - last)) / 1000);
  };

  const trigger = (id: string | number) => {
    setLastTimes((prev) => ({ ...prev, [id]: Date.now() }));
  };

  return { isOnCooldown, getRemaining, trigger };
};
