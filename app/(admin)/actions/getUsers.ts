import prisma from "@/app/libs/prismadb";

export default async function getUsers() {
  try {
    const data = await prisma.user.findMany();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
