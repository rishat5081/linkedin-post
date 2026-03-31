"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout";
import { PostDetailPanel, PostForm } from "@/components/posts";
import { FadeIn } from "@/components/motion";
import { Button } from "@/components/ui";
import type { Post } from "@/types";
import Link from "next/link";

interface PostDetailClientProps {
  post: Post;
  editMode: boolean;
}

export function PostDetailClient({ post, editMode }: PostDetailClientProps) {
  const [editing, setEditing] = useState(editMode);

  if (editing) {
    return (
      <div className="space-y-8">
        <FadeIn>
          <PageHeader
            title="Edit Post"
            description={`Editing "${post.title}"`}
            actions={
              <Button variant="ghost" onClick={() => setEditing(false)}>
                Cancel Edit
              </Button>
            }
          />
        </FadeIn>
        <PostForm post={post} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <Link
            href="/posts"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            All Posts
          </Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-white">{post.title}</span>
        </div>
      </FadeIn>
      <PostDetailPanel post={post} />
    </div>
  );
}
