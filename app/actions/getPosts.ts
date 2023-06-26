import { db } from "@/lib/db";

export default async function getPosts() {
  try {
    const data = await db.post.findMany({
      include: {
        user: true,
        hearts: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
