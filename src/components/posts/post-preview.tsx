"use client";

import { useState } from "react";
import { Badge } from "@/components/ui";
import { FadeIn } from "@/components/motion";
import { formatHashtags } from "@/lib/utils";
import type { PostFormData } from "@/types";
import Image from "next/image";

interface PostPreviewProps {
  data: PostFormData;
}

export function PostPreview({ data }: PostPreviewProps) {
  const [copied, setCopied] = useState(false);
  const hasContent = data.hook || data.body || data.title;

  const handleCopy = async () => {
    const parts = [
      data.hook,
      data.body,
      data.cta,
      data.hashtags.length > 0 ? formatHashtags(data.hashtags) : "",
    ].filter(Boolean);

    await navigator.clipboard.writeText(parts.join("\n\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!hasContent) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-zinc-200 p-8 dark:border-zinc-700">
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          Start writing to see a preview
        </p>
      </div>
    );
  }

  return (
    <FadeIn>
      <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
        {/* Copy button — top right */}
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-lg bg-zinc-100 px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
        >
          {copied ? (
            <>
              <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>

        {/* LinkedIn-style header */}
        <div className="border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-400 dark:from-zinc-600 dark:to-zinc-700" />
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                You
              </p>
              <div className="flex items-center gap-1.5">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Just now
                </p>
                <span className="text-zinc-300 dark:text-zinc-600">·</span>
                <Badge status={data.status} />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 py-4 space-y-3">
          {data.hook && (
            <p className="text-sm font-semibold leading-relaxed text-zinc-900 dark:text-white">
              {data.hook}
            </p>
          )}

          {data.body && (
            <div className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
              {data.body}
            </div>
          )}

          {data.cta && (
            <p className="text-sm font-medium text-zinc-900 dark:text-white">
              {data.cta}
            </p>
          )}

          {data.hashtags.length > 0 && (
            <p className="text-sm text-blue-600 dark:text-blue-400">
              {formatHashtags(data.hashtags)}
            </p>
          )}
        </div>

        {/* Images */}
        {data.image_urls.length > 0 && (
          <div className="border-t border-zinc-100 dark:border-zinc-800">
            {data.image_urls.length === 1 ? (
              <div className="relative aspect-video">
                <Image
                  src={data.image_urls[0]}
                  alt="Post image"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-0.5">
                {data.image_urls.slice(0, 4).map((url, i) => (
                  <div key={i} className="relative aspect-video">
                    <Image
                      src={url}
                      alt={`Post image ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </FadeIn>
  );
}
