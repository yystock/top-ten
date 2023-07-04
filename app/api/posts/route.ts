import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await request.json();
    const title = body.title;

    if (!title) {
      NextResponse.error();
    }

    const post = await db.post.create({
      data: {
        title: title,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("[POSTS_POST]", error);
    return new Response("Could not fetch posts", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const { limit, page } = z
      .object({
        limit: z.string(),
        page: z.string(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      });

    const posts = await db.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        hearts: true,
        comments: true,
      },
    });

    return new Response(JSON.stringify(posts));
  } catch (error) {
    console.log("[POSTS_GET]", error);
    return new Response("Could not fetch posts", { status: 500 });
  }
}
