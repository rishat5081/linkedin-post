"use client";

import { PageHeader } from "@/components/layout";
import { StatCard } from "@/components/dashboard";
import { HistoryList } from "@/components/posts";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/motion";
import type { Post, PostStats } from "@/types";

interface DashboardClientProps {
  posts: Post[];
  stats: PostStats;
}

export function DashboardClient({ posts, stats }: DashboardClientProps) {
  return (
    <div className="space-y-8">
      <FadeIn>
        <PageHeader
          title="Dashboard"
          description={`${stats.total} post${stats.total !== 1 ? "s" : ""} in your collection.`}
        />
      </FadeIn>

      {/* Stats */}
      <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StaggerItem>
          <StatCard
            label="Total Posts"
            value={stats.total}
            accent="linear-gradient(135deg, #18181b, #3f3f46)"
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label="Drafts"
            value={stats.drafts}
            accent="linear-gradient(135deg, #71717a, #a1a1aa)"
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            }
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label="Scheduled"
            value={stats.scheduled}
            accent="linear-gradient(135deg, #f59e0b, #fbbf24)"
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label="Published"
            value={stats.published}
            accent="linear-gradient(135deg, #10b981, #34d399)"
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </StaggerItem>
      </StaggerGroup>

      {/* Full post list with search/filter */}
      <HistoryList posts={posts} />
    </div>
  );
}
