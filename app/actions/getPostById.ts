import { db } from "@/lib/db";

interface IParams {
  postId?: string;
}

export default async function getPostById(params: IParams) {
  try {
    const { postId } = params;

    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: true,
            hearts: true,
          },
        },
        hearts: true,
      },
    });

    if (!post) {
      return null;
    }

    return post;
  } catch (error: any) {
    throw new Error(error);
  }
}
