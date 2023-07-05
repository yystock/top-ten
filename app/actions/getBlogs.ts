import { db } from "@/lib/db";

export default async function getBlogs() {
  try {
    const data = await db.blog.findMany({
      include: {
        user: true,
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
