"use client";

import { PageHeader } from "@/components/layout";
import { HistoryList } from "@/components/posts";
import { FadeIn } from "@/components/motion";
import { Button } from "@/components/ui";
import type { Post } from "@/types";
import Link from "next/link";

interface PostsClientProps {
  posts: Post[];
}

export function PostsClient({ posts }: PostsClientProps) {
  return (
    <div className="space-y-8">
      <FadeIn>
        <PageHeader
          title="All Posts"
          description={`${posts.length} post${posts.length !== 1 ? "s" : ""} in your collection.`}
          actions={
            <Link href="/posts/new">
              <Button>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New Post
              </Button>
            </Link>
          }
        />
      </FadeIn>
      <HistoryList posts={posts} />
    </div>
  );
}
