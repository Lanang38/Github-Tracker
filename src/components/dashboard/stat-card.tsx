'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatItem {
  label: string;
  value: number;
  hint?: string;
  highlight?: boolean;
  delay?: number;
}

const stats: StatItem[] = [
  {
    label: 'Total Projects',
    value: 24,
    hint: 'Increased from last month',
    highlight: true,
    delay: 0,
  },
  {
    label: 'Ended Projects',
    value: 10,
    hint: 'Increased from last month',
    delay: 0.05,
  },
  {
    label: 'Running Projects',
    value: 12,
    hint: 'Increased from last month',
    delay: 0.1,
  },
  {
    label: 'Pending Project',
    value: 2,
    hint: 'On discuss',
    delay: 0.15,
  },
];

function AnimatedNumber({
  value,
  delay = 0,
}: {
  value: number;
  delay?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frameId: number;
    let startTime: number | null = null;

    const duration = 700;

    const timeoutId = window.setTimeout(() => {
      const animate = (time: number) => {
        if (startTime === null) {
          startTime = time;
        }

        const progress = Math.min((time - startTime) / duration, 1);

        const eased = 1 - Math.pow(1 - progress, 3);

        setDisplayValue(Math.round(value * eased));

        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        }
      };

      frameId = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [value, delay]);

  return displayValue;
}

export function StatCard() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className={cn(
            'flex flex-col gap-3 p-5',
            stat.highlight && 'bg-emerald-800 text-white',
          )}
        >
          <div className="flex items-center justify-between">
            <span
              className={cn(
                'text-sm font-medium',
                stat.highlight ? 'text-emerald-100' : 'text-neutral-500',
              )}
            >
              {stat.label}
            </span>

            <span
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-full',
                stat.highlight ? 'bg-emerald-700' : 'bg-neutral-100',
              )}
            >
              <ArrowUpRight
                className={cn(
                  'h-4 w-4',
                  stat.highlight ? 'text-white' : 'text-neutral-500',
                )}
              />
            </span>
          </div>

          <span className="text-3xl font-bold tabular-nums">
            <AnimatedNumber value={stat.value} delay={stat.delay} />
          </span>

          {stat.hint && (
            <span
              className={cn(
                'text-xs',
                stat.highlight ? 'text-emerald-100' : 'text-neutral-400',
              )}
            >
              {stat.hint}
            </span>
          )}
        </Card>
      ))}
    </div>
  );
}
