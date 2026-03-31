import type { PostStatus } from "@/types";

export const STATUS_OPTIONS: { value: PostStatus | "all"; label: string }[] = [
  { value: "all", label: "All Posts" },
  { value: "draft", label: "Draft" },
  { value: "scheduled", label: "Scheduled" },
  { value: "published", label: "Published" },
];

export const STATUS_COLORS: Record<PostStatus, string> = {
  draft: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  scheduled: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  published: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
};

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "title", label: "Title A–Z" },
] as const;

export const APP_NAME = "PostFlow";
export const APP_DESCRIPTION = "Your LinkedIn content command center";
