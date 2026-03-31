"use client";

import { Card, Badge } from "@/components/ui";
import { FadeIn } from "@/components/motion";
import { formatHashtags, truncate } from "@/lib/utils";
import type { Post } from "@/types";
import Link from "next/link";

interface FeaturedPostProps {
  post: Post | null;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  if (!post) {
    return (
      <Card className="border-dashed">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
            No posts yet
          </p>
          <Link
            href="/posts/new"
            className="mt-3 text-sm font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
          >
            Write your first post →
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <FadeIn>
      <Link href={`/posts/${post.id}`}>
        <Card
          hover
          className="group relative overflow-hidden border-zinc-300/60 dark:border-zinc-700"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-400/40 to-transparent" />
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Latest Post
              </p>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                {post.title}
              </h3>
            </div>
            <Badge status={post.status} />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {post.hook}
          </p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">
            {truncate(post.body, 160)}
          </p>
          {post.hashtags.length > 0 && (
            <p className="mt-4 text-xs font-medium text-zinc-400 dark:text-zinc-500">
              {formatHashtags(post.hashtags)}
            </p>
          )}
        </Card>
      </Link>
    </FadeIn>
  );
}
