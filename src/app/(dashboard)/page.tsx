import { getPosts, getPostStats } from "@/lib/posts/actions";
import { DashboardClient } from "./dashboard-client";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [posts, stats] = await Promise.all([
    getPosts({ sort: "newest" }),
    getPostStats(),
  ]);

  return <DashboardClient posts={posts} stats={stats} />;
}
