import { describe, it, expect } from "vitest";
import {
  calculateStats,
  filterPostsBySearch,
  filterPostsByStatus,
  truncate,
} from "../posts";
import type { Post } from "@/types";

const makePosts = (): Post[] => [
  {
    id: "1",
    title: "First Post",
    hook: "This is the hook for first post",
    body: "Body of the first post about engineering",
    cta: "What do you think?",
    hashtags: ["#engineering"],
    image_urls: [],
    status: "draft",
    scheduled_for: null,
    published_at: null,
    created_at: "2026-03-28T09:00:00Z",
    updated_at: "2026-03-28T09:00:00Z",
  },
  {
    id: "2",
    title: "Second Post",
    hook: "AI is changing everything",
    body: "Body about AI and productivity",
    cta: null,
    hashtags: ["#ai", "#productivity"],
    image_urls: [],
    status: "published",
    scheduled_for: null,
    published_at: "2026-03-25T14:00:00Z",
    created_at: "2026-03-25T14:00:00Z",
    updated_at: "2026-03-25T14:00:00Z",
  },
  {
    id: "3",
    title: "Third Post",
    hook: "Scheduled for tomorrow",
    body: "This will go live soon",
    cta: "Stay tuned!",
    hashtags: [],
    image_urls: [],
    status: "scheduled",
    scheduled_for: "2026-04-01T08:00:00Z",
    published_at: null,
    created_at: "2026-03-30T10:00:00Z",
    updated_at: "2026-03-30T10:00:00Z",
  },
  {
    id: "4",
    title: "Fourth Post",
    hook: "Another draft in progress",
    body: "Still working on this one",
    cta: null,
    hashtags: ["#wip"],
    image_urls: [],
    status: "draft",
    scheduled_for: null,
    published_at: null,
    created_at: "2026-03-31T08:00:00Z",
    updated_at: "2026-03-31T08:00:00Z",
  },
];

describe("calculateStats", () => {
  it("calculates correct totals", () => {
    const stats = calculateStats(makePosts());
    expect(stats.total).toBe(4);
    expect(stats.drafts).toBe(2);
    expect(stats.scheduled).toBe(1);
    expect(stats.published).toBe(1);
  });

  it("returns zeros for empty array", () => {
    const stats = calculateStats([]);
    expect(stats.total).toBe(0);
    expect(stats.drafts).toBe(0);
    expect(stats.scheduled).toBe(0);
    expect(stats.published).toBe(0);
  });
});

describe("filterPostsBySearch", () => {
  const posts = makePosts();

  it("returns all posts for empty search", () => {
    expect(filterPostsBySearch(posts, "")).toHaveLength(4);
    expect(filterPostsBySearch(posts, "  ")).toHaveLength(4);
  });

  it("filters by title match", () => {
    const result = filterPostsBySearch(posts, "First");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("filters by hook match", () => {
    const result = filterPostsBySearch(posts, "AI is changing");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("filters by body match", () => {
    const result = filterPostsBySearch(posts, "engineering");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("is case-insensitive", () => {
    const result = filterPostsBySearch(posts, "first post");
    expect(result).toHaveLength(1);
  });

  it("returns empty for no matches", () => {
    expect(filterPostsBySearch(posts, "xyz123")).toHaveLength(0);
  });
});

describe("filterPostsByStatus", () => {
  const posts = makePosts();

  it('returns all posts for "all" filter', () => {
    expect(filterPostsByStatus(posts, "all")).toHaveLength(4);
  });

  it("filters drafts correctly", () => {
    const result = filterPostsByStatus(posts, "draft");
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.status === "draft")).toBe(true);
  });

  it("filters published correctly", () => {
    const result = filterPostsByStatus(posts, "published");
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe("published");
  });

  it("filters scheduled correctly", () => {
    const result = filterPostsByStatus(posts, "scheduled");
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe("scheduled");
  });
});

describe("truncate", () => {
  it("returns text unchanged if within limit", () => {
    expect(truncate("Hello", 10)).toBe("Hello");
  });

  it("truncates with ellipsis when text exceeds limit", () => {
    expect(truncate("Hello World!", 5)).toBe("Hello…");
  });

  it("handles exact length", () => {
    expect(truncate("Hello", 5)).toBe("Hello");
  });
});
