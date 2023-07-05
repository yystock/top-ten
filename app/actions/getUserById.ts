import { User } from "@prisma/client";
import { db } from "@/lib/db";
export default async function getUserById(userId: User["id"]) {
  return await db.user.findFirst({
    where: {
      id: userId,
    },
  });
}
