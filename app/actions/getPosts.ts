import prisma from "../libs/prismadb";

export default async function getPosts(
) {
  try {
    const data = await prisma.post.findMany({
        include: {
        user: true,
        hearts: true,
        comments: true,
        },
        orderBy: {
        createdAt: "desc",
        },
    })

    const safeData = data.map((d) => ({
      ...d,
      createdAt: d.createdAt.toISOString(),
    }));

    return safeData;
  } catch (error: any) {
    throw new Error(error);
  }
}
