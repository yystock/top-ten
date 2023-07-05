import { Star } from "@prisma/client";
import { db } from "@/lib/db";
export default async function getStarById(starId: Star["id"]) {
  return await db.star.findFirst({
    where: {
      id: starId,
    },
  });
}
