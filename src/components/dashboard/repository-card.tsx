'use client';

import { useTranslations } from 'next-intl';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface RepositoryLanguage {
  name: string;
  value: number;
  color: string;
}

const languages: RepositoryLanguage[] = [
  {
    name: 'TypeScript',
    value: 8,
    color: '#3178C6',
  },
  {
    name: 'JavaScript',
    value: 5,
    color: '#F7DF1E',
  },
  {
    name: 'Python',
    value: 4,
    color: '#3776AB',
  },
  {
    name: 'Java',
    value: 3,
    color: '#ED8B00',
  },
];

export function RepositoryCard() {
  const t = useTranslations('dashboard');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('repository')}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-54.5 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={languages}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={3}
                stroke="none"
              >
                {languages.map((language) => (
                  <Cell key={language.name} fill={language.color} />
                ))}
              </Pie>

              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || payload.length === 0) {
                    return null;
                  }

                  const item = payload[0];
                  const name = item.name;
                  const value = item.value;

                  return (
                    <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
                      <p className="text-xs font-medium text-neutral-900 dark:text-neutral-100">
                        {name}
                      </p>

                      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                        {Number(value ?? 0)} repositories
                      </p>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
