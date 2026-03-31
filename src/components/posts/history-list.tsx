"use client";

import { useState, useMemo } from "react";
import { Card, Badge, EmptyState, SearchBar, FilterChip } from "@/components/ui";
import { Select } from "@/components/ui";
import { AnimatedListItem } from "@/components/motion";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/motion";
import { timeAgo, truncate, filterPostsBySearch, filterPostsByStatus } from "@/lib/utils";
import { STATUS_OPTIONS, SORT_OPTIONS } from "@/lib/constants";
import type { Post, PostStatus } from "@/types";
import Link from "next/link";

interface HistoryListProps {
  posts: Post[];
}

export function HistoryList({ posts }: HistoryListProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<PostStatus | "all">("all");
  const [sort, setSort] = useState<string>("newest");

  const filtered = useMemo(() => {
    let result = filterPostsByStatus(posts, statusFilter);
    result = filterPostsBySearch(result, search);

    switch (sort) {
      case "oldest":
        return [...result].sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      case "title":
        return [...result].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return [...result].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
  }, [posts, search, statusFilter, sort]);

  return (
    <div className="space-y-6">
      {/* Filters bar */}
      <FadeIn delay={0.1}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar
            placeholder="Search posts..."
            onSearch={setSearch}
            className="sm:max-w-xs"
          />
          <div className="flex items-center gap-3">
            <Select
              options={SORT_OPTIONS.map((o) => ({
                value: o.value,
                label: o.label,
              }))}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            />
          </div>
        </div>
      </FadeIn>

      {/* Status chips */}
      <StaggerGroup className="flex flex-wrap gap-2">
        {STATUS_OPTIONS.map((opt) => (
          <StaggerItem key={opt.value}>
            <FilterChip
              label={opt.label}
              active={statusFilter === opt.value}
              onClick={() => setStatusFilter(opt.value)}
            />
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Posts list */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={
            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
          title="No posts found"
          description={
            search
              ? "Try adjusting your search or filters."
              : "Create your first post to get started."
          }
          action={
            !search ? (
              <Link
                href="/posts/new"
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                New Post
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((post, i) => (
            <AnimatedListItem key={post.id} index={i}>
              <Link href={`/posts/${post.id}`}>
                <Card hover className="group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-zinc-900 dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                          {post.title}
                        </h3>
                        <Badge status={post.status} />
                      </div>
                      <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                        {truncate(post.hook, 120)}
                      </p>
                      {post.hashtags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {post.hashtags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-zinc-400 dark:text-zinc-500"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                      {timeAgo(post.created_at)}
                    </span>
                  </div>
                </Card>
              </Link>
            </AnimatedListItem>
          ))}
        </div>
      )}
    </div>
  );
}
