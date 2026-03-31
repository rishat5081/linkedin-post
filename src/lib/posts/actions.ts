import { supabase } from "@/lib/supabase/client";
import type { Post, PostFormData, PostFilters, PostStats } from "@/types";

export async function getPosts(filters?: Partial<PostFilters>): Promise<Post[]> {
  let query = supabase.from("posts").select("*");

  if (filters?.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }

  if (filters?.search) {
    const term = `%${filters.search}%`;
    query = query.or(`title.ilike.${term},hook.ilike.${term},body.ilike.${term}`);
  }

  switch (filters?.sort) {
    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;
    case "title":
      query = query.order("title", { ascending: true });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data as Post[];
}

export async function getPost(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }
  return data as Post;
}

export async function createPost(formData: PostFormData): Promise<Post> {
  const payload: Record<string, unknown> = {
    title: formData.title,
    hook: formData.hook,
    body: formData.body,
    cta: formData.cta || null,
    hashtags: formData.hashtags,
    image_urls: formData.image_urls,
    status: formData.status,
    scheduled_for: formData.scheduled_for,
  };

  if (formData.status === "published") {
    payload.published_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("posts")
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Post;
}

export async function updatePost(
  id: string,
  formData: Partial<PostFormData>
): Promise<Post> {
  const payload: Record<string, unknown> = { ...formData };

  if (formData.status === "published" && formData.status !== undefined) {
    payload.published_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("posts")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Post;
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function getPostStats(): Promise<PostStats> {
  const { data, error } = await supabase.from("posts").select("status");
  if (error) throw new Error(error.message);

  const posts = data as { status: string }[];
  return {
    total: posts.length,
    drafts: posts.filter((p) => p.status === "draft").length,
    scheduled: posts.filter((p) => p.status === "scheduled").length,
    published: posts.filter((p) => p.status === "published").length,
  };
}

export async function getTodayPost(): Promise<Post | null> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .gte("created_at", today.toISOString())
    .lt("created_at", tomorrow.toISOString())
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data as Post | null;
}
