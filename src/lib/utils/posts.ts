import type { Post, PostStats } from "@/types";

/**
 * Calculate stats from a list of posts.
 */
export function calculateStats(posts: Post[]): PostStats {
  return {
    total: posts.length,
    drafts: posts.filter((p) => p.status === "draft").length,
    scheduled: posts.filter((p) => p.status === "scheduled").length,
    published: posts.filter((p) => p.status === "published").length,
  };
}

/**
 * Filter posts by search term (matches title, hook, body).
 */
export function filterPostsBySearch(posts: Post[], search: string): Post[] {
  if (!search.trim()) return posts;
  const term = search.toLowerCase();
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(term) ||
      p.hook.toLowerCase().includes(term) ||
      p.body.toLowerCase().includes(term)
  );
}

/**
 * Filter posts by status.
 */
export function filterPostsByStatus(
  posts: Post[],
  status: string
): Post[] {
  if (status === "all") return posts;
  return posts.filter((p) => p.status === status);
}

/**
 * Truncate text to a given length.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}
