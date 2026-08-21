"use client";

import { useTranslations } from "next-intl";
import { Video, CalendarPlus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Placeholder — nantinya diganti data asli dari collection Meeting (MongoDB)
// yang meeting.startTime paling dekat dengan waktu sekarang
const upcomingMeeting: { title: string; timeRange: string; meetLink: string } | null = {
  title: "Meeting with Arc Company",
  timeRange: "14:00 – 15:00",
  meetLink: "#",
};

export function UpcomingMeetingCard() {
  const t = useTranslations("dashboard");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("upcomingMeeting")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {upcomingMeeting ? (
          <>
            <div>
              <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
                {upcomingMeeting.title}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {upcomingMeeting.timeRange}
              </p>
            </div>
            <Button className="w-full justify-center gap-2">
              <Video className="h-4 w-4" />
              {t("startMeeting")}
            </Button>
          </>
        ) : (
          <>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {t("noUpcomingMeeting")}
            </p>
            <Button variant="outline" className="w-full justify-center gap-2">
              <CalendarPlus className="h-4 w-4" />
              {t("scheduleMeeting")}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
