"use client";

import { useTranslations } from "next-intl";
import { Bar, BarChart, ResponsiveContainer, XAxis, Tooltip, Cell } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface CommitActivityDatum {
  day: string;
  commits: number;
}

// Placeholder data — nantinya diganti data asli dari Octokit
// (misal: jumlah commit per hari, 7 hari terakhir, lintas repo yang di-track)
const data: CommitActivityDatum[] = [
  { day: "Sen", commits: 4 },
  { day: "Sel", commits: 9 },
  { day: "Rab", commits: 6 },
  { day: "Kam", commits: 12 },
  { day: "Jum", commits: 2 },
  { day: "Sab", commits: 3 },
  { day: "Min", commits: 1 },
];

export function CommitActivityChart() {
  const t = useTranslations("dashboard");
  const max = Math.max(...data.map((d) => d.commits));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("commitActivity")}</CardTitle>
      </CardHeader>
      <CardContent className="h-[180px] pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#a3a3a3" }}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                border: "1px solid #e5e5e5",
              }}
            />
            <Bar dataKey="commits" radius={[4, 4, 4, 4]}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.commits === max ? "#0f766e" : "#6ee7c8"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
