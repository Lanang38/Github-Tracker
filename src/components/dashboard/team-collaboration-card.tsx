"use client";

import { useTranslations } from "next-intl";
import { UserPlus, GitPullRequest, GitBranch, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface TeamMember {
  name: string;
  initials: string;
  avatarUrl?: string | null;
  task: string;
  icon: typeof GitPullRequest;
  status: "merged" | "inProgress" | "pending";
}

// Placeholder — nantinya diganti data asli: anggota project (User.avatarUrl
// dari GitHub) + task terbaru yang di-assign ke mereka (Task.status)
const members: TeamMember[] = [
  {
    name: "Alexandra Deff",
    initials: "AD",
    avatarUrl: null,
    task: "PR #142 — Repository setup",
    icon: GitPullRequest,
    status: "merged",
  },
  {
    name: "Edwin Adenike",
    initials: "EA",
    avatarUrl: null,
    task: "Auth system integration",
    icon: GitBranch,
    status: "inProgress",
  },
  {
    name: "Isaac Oluwatemilorun",
    initials: "IO",
    avatarUrl: null,
    task: "Search and filter feature",
    icon: Search,
    status: "pending",
  },
];

export function TeamCollaborationCard() {
  const t = useTranslations("dashboard");

  const statusLabel: Record<TeamMember["status"], string> = {
    merged: "Merged",
    inProgress: t("inProgress"),
    pending: "Pending",
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>{t("teamCollaboration")}</CardTitle>
        <Button variant="outline" size="sm" className="gap-1.5">
          <UserPlus className="h-3.5 w-3.5" />
          {t("addMember")}
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {members.map((member) => (
          <div key={member.name} className="flex items-center gap-3">
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
            <Badge variant={member.status}>{statusLabel[member.status]}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
