'use client';

import { useTranslations } from 'next-intl';
import { UserPlus, GitPullRequest, GitBranch, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface TeamMember {
  id: string;
  name: string;
  initials: string;
  avatarUrl?: string | null;
  task: string;
  icon: typeof GitPullRequest;
  status: 'merged' | 'inProgress' | 'pending';
}

// Placeholder — nantinya diganti data asli
const members: TeamMember[] = [
  {
    id: '1',
    name: 'Alexandra Deff',
    initials: 'AD',
    avatarUrl: null,
    task: 'PR #142 — Repository setup',
    icon: GitPullRequest,
    status: 'merged',
  },
  {
    id: '2',
    name: 'Edwin Adenike',
    initials: 'EA',
    avatarUrl: null,
    task: 'Auth system integration',
    icon: GitBranch,
    status: 'inProgress',
  },
  {
    id: '3',
    name: 'Isaac Oluwatemilorun',
    initials: 'IO',
    avatarUrl: null,
    task: 'Search and filter feature',
    icon: Search,
    status: 'pending',
  },
  {
    id: '4',
    name: 'Isaac mudeng',
    initials: 'IO',
    avatarUrl: null,
    task: 'Search and filter feature',
    icon: Search,
    status: 'pending',
  },
];

export function TeamCollaborationCard() {
  const t = useTranslations('dashboard');

  const statusLabel: Record<TeamMember['status'], string> = {
    merged: 'Merged',
    inProgress: t('inProgress'),
    pending: 'Pending',
  };

  return (
    <Card className="flex h-56.25 flex-col">
      {/* HEADER */}
      <CardHeader className="shrink-0 flex-row items-center justify-between space-y-0">
        <CardTitle>{t('teamCollaboration')}</CardTitle>

        <Button variant="outline" size="sm" className="h-8 gap-1.5 px-3">
          <UserPlus className="h-3.5 w-3.5" />
          {t('addMember')}
        </Button>
      </CardHeader>

      {/* MEMBER LIST */}
      <CardContent className="min-h-0 flex-1 overflow-y-auto custom-scroll">
        <div className="flex flex-col gap-3">
          {members.map((member) => (
            <div key={member.id} className="flex items-center gap-3">
              <Avatar
                src={member.avatarUrl}
                alt={member.name}
                fallback={member.initials}
                size={32}
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-neutral-800 dark:text-neutral-100">
                  {member.name}
                </p>

                <p className="flex items-center gap-1 truncate text-xs text-neutral-500 dark:text-neutral-400">
                  <member.icon className="h-3 w-3 shrink-0" />
                  {member.task}
                </p>
              </div>

              <Badge variant={member.status}>
                {statusLabel[member.status]}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
