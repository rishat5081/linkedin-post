export type PostStatus = "draft" | "scheduled" | "published";

export interface Post {
  id: string;
  title: string;
  hook: string;
  body: string;
  cta: string | null;
  hashtags: string[];
  image_urls: string[];
  status: PostStatus;
  scheduled_for: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PostFormData {
  title: string;
  hook: string;
  body: string;
  cta: string;
  hashtags: string[];
  image_urls: string[];
  status: PostStatus;
  scheduled_for: string | null;
}

export interface PostStats {
  total: number;
  drafts: number;
  scheduled: number;
  published: number;
}

export interface PostFilters {
  search: string;
  status: PostStatus | "all";
  sort: "newest" | "oldest" | "title";
}
