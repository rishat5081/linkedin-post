"use client";

import { Card } from "@/components/ui";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  accent?: string;
}

export function StatCard({ label, value, icon, accent }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ background: accent || "transparent" }}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {label}
          </p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white"
          >
            {value}
          </motion.p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          {icon}
        </div>
      </div>
    </Card>
  );
}
