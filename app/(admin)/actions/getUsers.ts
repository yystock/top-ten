import prisma from "@/lib/db";

export default async function getUsers() {
  try {
    const data = await prisma.user.findMany();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
