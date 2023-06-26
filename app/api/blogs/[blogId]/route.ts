import { NextResponse } from "next/server";
import { db } from "@/lib/db";

import * as z from "zod";
import { getCurrentUser } from "@/lib/session";

const blogUpdateSchema = z.object({
  title: z.string(),
  imageSrc: z.string(),
  category: z.string(),
  content: z.string(),
  slug: z.string(),
});
const routeContextSchema = z.object({
  params: z.object({
    blogId: z.string(),
  }),
});

export async function DELETE(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this blog.
    if (!(await verifyCurrentUserHasAccessToBlog(params.blogId))) {
      return new Response(null, { status: 403 });
    }

    // Delete the post.
    await db.post.delete({
      where: {
        id: params.blogId as string,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function PATCH(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    console.log("PATCH route");
    // Validate route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToBlog(params.blogId))) {
      return new Response(null, { status: 403 });
    }

    // Get the request body and validate it.
    const json = await req.json();
    const body = blogUpdateSchema.parse(json);

    // Update the post.
    // TODO: Implement sanitization for content.
    await db.blog.update({
      where: {
        id: params.blogId,
      },
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        imgSrc: body.imageSrc,
        category: body.category,
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
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
