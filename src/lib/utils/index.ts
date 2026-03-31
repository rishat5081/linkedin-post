export { parseHashtags, formatHashtags } from "./hashtags";
export { formatDate, formatDateTime, timeAgo, toDateTimeLocal } from "./dates";
export { calculateStats, filterPostsBySearch, filterPostsByStatus, truncate } from "./posts";

/**
 * Merge class names conditionally.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
