"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Badge, Button } from "@/components/ui";
import { FadeIn } from "@/components/motion";
import { formatDate, formatDateTime, formatHashtags } from "@/lib/utils";
import { deletePost } from "@/lib/posts/actions";
import type { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface PostDetailPanelProps {
  post: Post;
}

export function PostDetailPanel({ post }: PostDetailPanelProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const parts = [
      post.hook,
      post.body,
      post.cta,
      post.hashtags.length > 0 ? formatHashtags(post.hashtags) : "",
    ].filter(Boolean);
    await navigator.clipboard.writeText(parts.join("\n\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setDeleting(true);
    try {
      await deletePost(post.id);
      router.push("/posts");
      router.refresh();
    } catch (err) {
      console.error("Delete failed:", err);
      setDeleting(false);
    }
  };

  return (
    <FadeIn>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {post.title}
              </h1>
              <Badge status={post.status} />
            </div>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Created {formatDate(post.created_at)}
              {post.published_at && ` · Published ${formatDate(post.published_at)}`}
              {post.scheduled_for &&
                ` · Scheduled for ${formatDateTime(post.scheduled_for)}`}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={handleCopy}>
              {copied ? (
                <>
                  <svg className="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </Button>
            <Link href={`/posts/${post.id}?edit=true`}>
              <Button variant="secondary" size="sm">
                Edit
              </Button>
            </Link>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
              isLoading={deleting}
            >
              Delete
            </Button>
          </div>
        </div>

        {/* Content card */}
        <Card>
          <div className="space-y-4">
            {/* Hook */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Hook
              </p>
              <p className="mt-1 text-base font-semibold leading-relaxed text-zinc-900 dark:text-white">
                {post.hook}
              </p>
            </div>

            {/* Body */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Body
              </p>
              <div className="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                {post.body}
              </div>
            </div>

            {/* CTA */}
            {post.cta && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Call to Action
                </p>
                <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-white">
                  {post.cta}
                </p>
              </div>
            )}

            {/* Hashtags */}
            {post.hashtags.length > 0 && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Hashtags
                </p>
                <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">
                  {formatHashtags(post.hashtags)}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Images */}
        {post.image_urls.length > 0 && (
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Attached Images
            </p>
            <div className="grid grid-cols-2 gap-3">
              {post.image_urls.map((url, i) => (
                <div
                  key={i}
                  className="relative aspect-video overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700"
                >
                  <Image
                    src={url}
                    alt={`Post image ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Meta */}
        <Card className="bg-zinc-50/50 dark:bg-zinc-900/30">
          <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <div>
              <p className="text-zinc-400 dark:text-zinc-500">Status</p>
              <p className="mt-0.5 font-medium capitalize text-zinc-900 dark:text-white">
                {post.status}
              </p>
            </div>
            <div>
              <p className="text-zinc-400 dark:text-zinc-500">Created</p>
              <p className="mt-0.5 font-medium text-zinc-900 dark:text-white">
                {formatDate(post.created_at)}
              </p>
            </div>
            <div>
              <p className="text-zinc-400 dark:text-zinc-500">Updated</p>
              <p className="mt-0.5 font-medium text-zinc-900 dark:text-white">
                {formatDate(post.updated_at)}
              </p>
            </div>
            <div>
              <p className="text-zinc-400 dark:text-zinc-500">Images</p>
              <p className="mt-0.5 font-medium text-zinc-900 dark:text-white">
                {post.image_urls.length}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </FadeIn>
  );
}
