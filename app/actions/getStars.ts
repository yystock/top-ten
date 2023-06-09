import { db } from "@/lib/db";

export default async function getStars() {
  try {
    const data = await db.star.findMany({
      orderBy: {
        vote: "desc",
      },
    });
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
