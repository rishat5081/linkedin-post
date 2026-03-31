import { getPosts } from "@/lib/posts/actions";
import { PostsClient } from "./posts-client";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const posts = await getPosts();
  return <PostsClient posts={posts} />;
}
