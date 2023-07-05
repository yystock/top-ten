import Feed from "./Feed";
import { getCurrentUser } from "@/lib/session";
import AddPost from "./AddPost";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function Posts() {
  const currentUser = await getCurrentUser();

  const posts = await db.post.findMany({
    take: 2,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      hearts: true,
      comments: true,
    },
  });

  if (!posts) return notFound();

  return (
    <div className="items-center px-20">
      <div className="flex">
        <h1 className="bg-gradient-to-r from-blue-500 via-blue-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">Feed</h1>
      </div>
      <div className="pt-0.5">
        <AddPost currentUser={currentUser} />
      </div>
      <Feed firstPosts={posts} currentUser={currentUser} />
    </div>
  );
}
