/**
 * Parse a raw string of hashtags into a clean array.
 * Accepts: "#tag1 #tag2", "tag1, tag2", "tag1 tag2", "#tag1, #tag2"
 */
export function parseHashtags(input: string): string[] {
  if (!input.trim()) return [];

  return input
    .split(/[\s,]+/)
    .map((tag) => tag.replace(/^#/, "").trim())
    .filter(Boolean)
    .map((tag) => `#${tag}`);
}

/**
 * Format an array of hashtag strings for display.
 */
export function formatHashtags(hashtags: string[]): string {
  return hashtags
    .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
    .join(" ");
}
