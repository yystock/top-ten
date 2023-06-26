import { Blog, User } from "@prisma/client";
import { db } from "@/lib/db";
export default async function getBostForUser(blogId: Blog["id"], userId: User["id"]) {
  return await db.blog.findFirst({
    where: {
      id: blogId,
      userId: userId,
    },
  });
}
