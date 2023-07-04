import { NextResponse } from "next/server";
import { db } from "@/lib/db";

import * as z from "zod";
import { getCurrentUser } from "@/lib/session";
import { BlogValidator } from "@/lib/validations/blog";
const routeContextSchema = z.object({
  params: z.object({
    blogId: z.string(),
  }),
});

export async function DELETE(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    if (!(await verifyCurrentUserHasAccessToBlog(params.blogId))) {
      return new Response(null, { status: 403 });
    }

    await db.post.delete({
      where: {
        id: params.blogId as string,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.log("[BlogS_DELETE]", error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function PATCH(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    if (!(await verifyCurrentUserHasAccessToBlog(params.blogId))) {
      return new Response(null, { status: 403 });
    }

    const json = await req.json();
    const body = BlogValidator.parse(json);
    await db.blog.update({
      where: {
        id: params.blogId,
      },
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        imgSrc: body.imgSrc,
        category: body.category,
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    console.log("[BlogS_PATCH]", error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

async function verifyCurrentUserHasAccessToBlog(postId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return 0;
  const count = await db.blog.count({
    where: {
      id: postId,
      authorId: currentUser.id,
    },
  });

  return count > 0;
}
