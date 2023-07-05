import { db } from "@/lib/db";

export default async function getUsers() {
  try {
    const data = await db.user.findMany();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
