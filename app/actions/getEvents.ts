import { db } from "@/lib/db";

export default async function getEvents() {
  try {
    const data = await db.event.findMany({
      include: {
        user: true,
        images: true,
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
