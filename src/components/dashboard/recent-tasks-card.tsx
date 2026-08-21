"use client";

import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TaskItem {
  title: string;
  due: string;
  color: string;
}

// Placeholder — nantinya diganti data asli dari collection Task (MongoDB),
// diurutkan berdasarkan dueDate terdekat
const tasks: TaskItem[] = [
  { title: "Develop API Endpoints", due: "26 Nov 2024", color: "bg-blue-500" },
  { title: "Onboarding Flow", due: "28 Nov 2024", color: "bg-orange-500" },
  { title: "Build Dashboard", due: "30 Nov 2024", color: "bg-emerald-600" },
  { title: "Optimize Page Load", due: "5 Des 2024", color: "bg-amber-500" },
  { title: "Cross-Browser Testing", due: "6 Des 2024", color: "bg-violet-500" },
];

export function RecentTasksCard() {
  const t = useTranslations("dashboard");

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>{t("recentTasks")}</CardTitle>
        <button className="flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-500">
          <Plus className="h-3.5 w-3.5" />
          {t("newProject")}
        </button>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {tasks.map((task) => (
          <div key={task.title} className="flex items-center gap-3">
            <span className={`h-2 w-2 shrink-0 rounded-full ${task.color}`} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-neutral-800 dark:text-neutral-100">
                {task.title}
              </p>
              <p className="text-xs text-neutral-400">
                {t("due")}: {task.due}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
