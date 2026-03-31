"use client";

import { Card, Badge } from "@/components/ui";
import { AnimatedListItem } from "@/components/motion";
import { timeAgo, truncate } from "@/lib/utils";
import type { Post } from "@/types";
import Link from "next/link";

interface RecentPostsProps {
  posts: Post[];
}

export function RecentPosts({ posts }: RecentPostsProps) {
  if (posts.length === 0) {
    return (
      <Card className="border-dashed">
        <p className="py-4 text-center text-sm text-zinc-400">
          No posts yet. Create your first one!
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {posts.slice(0, 5).map((post, i) => (
        <AnimatedListItem key={post.id} index={i}>
          <Link href={`/posts/${post.id}`}>
            <Card hover className="group">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-zinc-900 dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                    {post.title}
                  </h4>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {truncate(post.hook, 100)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge status={post.status} />
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                    {timeAgo(post.created_at)}
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        </AnimatedListItem>
      ))}
    </div>
  );
}
