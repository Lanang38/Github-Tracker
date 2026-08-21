import { useTranslations } from 'next-intl';
import { Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { StatCard } from '@/components/dashboard/stat-card';
import { CommitActivityChart } from '@/components/dashboard/commit-activity-chart';
import { UpcomingMeetingCard } from '@/components/dashboard/upcoming-meeting-card';
import { TeamCollaborationCard } from '@/components/dashboard/team-collaboration-card';
import { ProjectProgressCard } from '@/components/dashboard/project-progress-card';
import { RecentTasksCard } from '@/components/dashboard/recent-tasks-card';
import { RepositoryCard } from '@/components/dashboard/repository-card';

export default function DashboardPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="flex flex-col gap-6">
      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
            {t('title')}
          </h1>

          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline">
            <Upload className="h-4 w-4" />
            {t('importData')}
          </Button>

          <Button>
            <Plus className="h-4 w-4" />
            {t('addProject')}
          </Button>
        </div>
      </div>

      {/* STAT CARDS */}
      <StatCard />

      {/* MAIN DASHBOARD */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* MAIN COLUMN */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <CommitActivityChart />

          <TeamCollaborationCard />

          <RecentTasksCard />
        </div>

        {/* SIDE COLUMN */}
        <div className="flex flex-col gap-4">
          <UpcomingMeetingCard />

          <ProjectProgressCard />

          <RepositoryCard />
        </div>
      </div>
    </div>
  );
}
