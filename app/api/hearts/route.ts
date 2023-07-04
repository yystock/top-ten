import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const postId = body.postId;

  if (!postId) {
    NextResponse.error();
  }

  // Check if user has already liked the post
  const alreadyLiked = await db.postHeart.findFirst({
    where: {
      postId: postId as string,
      userId: currentUser?.id as string,
    },
  });

  try {
    if (!alreadyLiked) {
      const result = await db.postHeart.create({
        data: {
          postId: postId as string,
          userId: currentUser?.id as string,
        },
      });

      return NextResponse.json(result);
    } else {
      // Delete like if user has already liked the post
      const result = await db.postHeart.delete({
        where: {},
      });
      return NextResponse.json(result);
    }
  } catch (err) {
    NextResponse.error();
  }
}
