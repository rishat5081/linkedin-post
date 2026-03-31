import { getPost } from "@/lib/posts/actions";
import { notFound } from "next/navigation";
import { PostDetailClient } from "./post-detail-client";

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ edit?: string }>;
}

export default async function PostDetailPage({
  params,
  searchParams,
}: PostDetailPageProps) {
  const { id } = await params;
  const { edit } = await searchParams;
  const post = await getPost(id);

  if (!post) notFound();

  return <PostDetailClient post={post} editMode={edit === "true"} />;
}
