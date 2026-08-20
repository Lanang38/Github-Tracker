"use client";

import { motion } from "motion/react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  icon?: LucideIcon;
  highlight?: boolean;
  delay?: number;
}

export function StatCard({
  label,
  value,
  hint,
  highlight = false,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      <Card
        className={cn(
          "flex flex-col gap-3 p-5",
          highlight && "bg-emerald-800 text-white"
        )}
      >
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "text-sm font-medium",
              highlight ? "text-emerald-100" : "text-neutral-500"
            )}
          >
            {label}
          </span>
          <span
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full",
              highlight ? "bg-emerald-700" : "bg-neutral-100"
            )}
          >
            <ArrowUpRight
              className={cn("h-4 w-4", highlight ? "text-white" : "text-neutral-500")}
            />
          </span>
        </div>
        <span className="text-3xl font-bold">{value}</span>
        {hint && (
          <span
            className={cn(
              "text-xs",
              highlight ? "text-emerald-100" : "text-neutral-400"
            )}
          >
            {hint}
          </span>
        )}
      </Card>
    </motion.div>
  );
}
