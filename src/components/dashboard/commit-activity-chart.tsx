'use client';

import { useTranslations } from 'next-intl';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface CommitActivityDatum {
  day: string;
  commits: number;
}

const data: CommitActivityDatum[] = [
  { day: 'Sen', commits: 4 },
  { day: 'Sel', commits: 9 },
  { day: 'Rab', commits: 6 },
  { day: 'Kam', commits: 12 },
  { day: 'Jum', commits: 2 },
  { day: 'Sab', commits: 3 },
  { day: 'Min', commits: 1 },
];

export function CommitActivityChart() {
  const t = useTranslations('dashboard');
  const max = Math.max(...data.map((d) => d.commits));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('commitActivity')}</CardTitle>
      </CardHeader>

      <CardContent className="h-45 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: '#a3a3a3',
              }}
            />

            <Tooltip
              cursor={{ fill: 'transparent' }}
              content={({ active, payload }) => {
                if (!active || !payload || payload.length === 0) {
                  return null;
                }

                const item = payload[0];

                return (
                  <div
                    className="
                      rounded-lg
                      border border-neutral-200
                      bg-white
                      px-3 py-2
                      shadow-lg
                      dark:border-neutral-700
                      dark:bg-neutral-900
                    "
                  >
                    <p className="text-xs font-medium text-neutral-900 dark:text-neutral-100">
                      {item.payload.day}
                    </p>

                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                      {item.value} commits
                    </p>
                  </div>
                );
              }}
            />

            <Bar dataKey="commits" radius={[4, 4, 4, 4]}>
              {data.map((entry) => (
                <Cell
                  key={entry.day}
                  fill={entry.commits === max ? '#0f766e' : '#6ee7c8'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
