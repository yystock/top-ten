import { db } from "@/lib/db";

interface IParams {
  slug?: string;
}

export default async function getBlogBySlug(params: IParams) {
  try {
    const { slug } = params;
    const blog = await db.blog.findUnique({
      where: {
        slug: slug,
      },
      include: {
        user: true,
        comments: true,
        hearts: true,
      },
    });

    if (!slug) {
      return null;
    }

    return blog;
  } catch (error: any) {
    throw new Error(error);
  }
}
