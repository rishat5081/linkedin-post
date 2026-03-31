/**
 * Format a date string for display.
 */
export function formatDate(dateString: string | null): string {
  if (!dateString) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

/**
 * Format a date string with time.
 */
export function formatDateTime(dateString: string | null): string {
  if (!dateString) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(dateString));
}

/**
 * Get relative time string (e.g., "2 hours ago", "3 days ago").
 */
export function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];

  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) {
      return `${count} ${label}${count !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

/**
 * Convert a Date to a datetime-local input value.
 */
export function toDateTimeLocal(dateString: string | null): string {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toISOString().slice(0, 16);
}
