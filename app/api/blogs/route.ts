import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";
import * as z from "zod";
const blogCreateSchema = z.object({
  title: z.string(),
  imgSrc: z.string(),
  category: z.string(),
  content: z.any(),
  slug: z.string(),
});

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unauthorized", { status: 403 });
    }

    const json = await req.json();
    const body = blogCreateSchema.parse(json);

    const blog = await db.blog.create({
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        authorId: currentUser.id,
        imgSrc: body.imgSrc,
        category: body.category,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.log("[BlogS_POST]", error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    return new Response(JSON.stringify(error.issues), { status: 500 });
  }
}
