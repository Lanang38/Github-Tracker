import { useTranslations } from 'next-intl';
import { Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/stat-card';
import { CommitActivityChart } from '@/components/dashboard/commit-activity-chart';
import { UpcomingMeetingCard } from '@/components/dashboard/upcoming-meeting-card';
import { TeamCollaborationCard } from '@/components/dashboard/team-collaboration-card';
import { ProjectProgressCard } from '@/components/dashboard/project-progress-card';
import { RecentTasksCard } from '@/components/dashboard/recent-tasks-card';

export default function DashboardPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="flex flex-col gap-6">
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
            <Upload className="h-4 w-4" /> {t('importData')}
          </Button>
          <Button>
            <Plus className="h-4 w-4" /> {t('addProject')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label={t('totalProjects')}
          value={24}
          hint={t('increasedFromLastMonth')}
          highlight
          delay={0}
        />
        <StatCard
          label={t('endedProjects')}
          value={10}
          hint={t('increasedFromLastMonth')}
          delay={0.05}
        />
        <StatCard
          label={t('runningProjects')}
          value={12}
          hint={t('increasedFromLastMonth')}
          delay={0.1}
        />
        <StatCard
          label={t('pendingProject')}
          value={2}
          hint={t('onDiscuss')}
          delay={0.15}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Kolom utama: chart & kolaborasi tim */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <CommitActivityChart />
          <TeamCollaborationCard />
        </div>

        {/* Kolom samping: meeting, progress, task terbaru */}
        <div className="flex flex-col gap-4">
          <UpcomingMeetingCard />
          <ProjectProgressCard />
          <RecentTasksCard />
        </div>
      </div>
    </div>
  );
}
