'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const projects = [
  {
    id: 'project-1',
    name: 'Website Redesign',
    progress: 41,
  },
  {
    id: 'project-2',
    name: 'Mobile Application',
    progress: 68,
  },
  {
    id: 'project-3',
    name: 'Payment Gateway',
    progress: 82,
  },
  {
    id: 'project-4',
    name: 'Dashboard Analytics',
    progress: 56,
  },
];

const COLORS = ['#0f766e', '#e5e5e5'];

export function ProjectProgressCard() {
  const t = useTranslations('dashboard');

  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [displayProgress, setDisplayProgress] = useState(0);

  const progressPercent = selectedProject.progress;

  useEffect(() => {
    let frameId: number;
    let startTime: number | null = null;

    const duration = 700;

    const animate = (time: number) => {
      if (startTime === null) {
        startTime = time;
      }

      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayProgress(Math.round(progressPercent * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [progressPercent]);

  const data = [
    {
      name: 'completed',
      value: progressPercent,
    },
    {
      name: 'remaining',
      value: 100 - progressPercent,
    },
  ];

  return (
    <Card>
      {/* HEADER */}
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>{t('projectProgress')}</CardTitle>

        {/* PROJECT DROPDOWN */}
        <select
          value={selectedProject.id}
          onChange={(event) => {
            const project = projects.find(
              (item) => item.id === event.target.value,
            );

            if (project) {
              setSelectedProject(project);
            }
          }}
          className="max-w-37.5 cursor-pointer rounded-lg border border-neutral-200bg-white px-2.5 py-1.5 text-xs font-medium text-neutral-700 outline-none transition-colors  hover:bg-neutral-50focus:border-emerald-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800">
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-3">
        {/* PROGRESS CHART */}
        <div className="relative h-43 w-full">
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

          {/* PERCENTAGE */}
          <div className="absolute inset-x-0 bottom-2 flex flex-col items-center">
            <span className="text-2xl font-bold tabular-nums text-neutral-900 dark:text-neutral-50">
              {displayProgress}%
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
