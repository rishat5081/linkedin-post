"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { PageHeader } from "@/components/layout";
import { Button, Card } from "@/components/ui";
import { PostPreview } from "@/components/posts";
import { FadeIn } from "@/components/motion";
import { createPost } from "@/lib/posts/actions";
import type { PostFormData } from "@/types";

export default function GeneratePage() {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState<PostFormData | null>(null);
  const [trendingTopic, setTrendingTopic] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const hasGenerated = useRef(false);

  const generate = useCallback(async (topic?: string) => {
    setGenerating(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic || undefined }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Generation failed");
      }

      const data = await res.json();

      const imageUrls = data.image_url ? [data.image_url] : [];

      const postData: PostFormData = {
        title: data.title,
        hook: data.hook,
        body: data.body,
        cta: data.cta,
        hashtags: data.hashtags || [],
        image_urls: imageUrls,
        status: "draft",
        scheduled_for: null,
      };

      setTrendingTopic(data.trending_topic || topic || "");

      await createPost(postData);

      setGenerated(postData);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setGenerating(false);
    }
  }, []);

  useEffect(() => {
    if (!hasGenerated.current) {
      hasGenerated.current = true;
      generate();
    }
  }, [generate]);

  const handleCustomGenerate = () => {
    generate(customTopic.trim() || undefined);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !generating) {
      handleCustomGenerate();
    }
  };

  return (
    <div className="space-y-8">
      <FadeIn>
        <PageHeader
          title="Generate Post"
          description="Based on trending LinkedIn topics, or type your own."
          actions={
            <Button
              onClick={() => generate()}
              isLoading={generating}
              disabled={generating}
            >
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {generating ? "Generating..." : "Refresh"}
            </Button>
          }
        />
      </FadeIn>

      {/* Optional topic input */}
      <FadeIn delay={0.05}>
        <div className="mx-auto flex max-w-lg items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Or type a topic... (e.g. AI agents, hiring mistakes)"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={generating}
              className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
            />
          </div>
          {customTopic.trim() && (
            <Button
              onClick={handleCustomGenerate}
              disabled={generating}
              size="sm"
              variant="secondary"
            >
              Generate
            </Button>
          )}
        </div>
      </FadeIn>

      {error && (
        <div className="mx-auto max-w-lg">
          <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30">
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </Card>
        </div>
      )}

      {generating && (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-600 dark:border-t-white" />
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            {customTopic.trim()
              ? "Generating post about your topic..."
              : "Scanning trends & crafting your post..."}
          </p>
        </div>
      )}

      {!generating && generated && (
        <FadeIn key={generated.hook}>
          <div className="mx-auto max-w-lg space-y-4">
            <div className="flex items-center justify-between">
              {trendingTopic && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  {trendingTopic}
                </span>
              )}
              {saved && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Saved
                </div>
              )}
            </div>

            <PostPreview data={generated} />
          </div>
        </FadeIn>
      )}
    </div>
  );
}
