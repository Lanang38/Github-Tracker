'use client';

import { useTranslations } from 'next-intl';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Placeholder
const progressPercent = 41;

const data = [
  { name: 'completed', value: progressPercent },
  { name: 'remaining', value: 100 - progressPercent },
];

const COLORS = ['#0f766e', '#e5e5e5'];

export function ProjectProgressCard() {
  const t = useTranslations('dashboard');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('projectProgress')}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-3">
        {/* PROGRESS CHART */}
        <div className="relative h-46 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                startAngle={180}
                endAngle={0}
                innerRadius="72%"
                outerRadius="100%"
                cy="85%"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-x-0 bottom-2 flex flex-col items-center">
            <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
              {progressPercent}%
            </span>

            <span className="text-xs text-neutral-400">
              {t('projectEnded')}
            </span>
          </div>
        </div>

        {/* LEGEND */}
        <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-700" />
            {t('completed')}
          </span>

          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-600" />
            {t('inProgress')}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
