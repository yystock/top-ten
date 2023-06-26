import { NextResponse } from "next/server";

import prisma from "@/lib/db";
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
  const alreadyLiked = await prisma.heart.findFirst({
    where: {
      postId: postId as string,
      userId: currentUser?.id as string,
    },
  });

  try {
    if (!alreadyLiked) {
      const result = await prisma.heart.create({
        data: {
          postId: postId as string,
          userId: currentUser?.id as string,
        },
      });

      return NextResponse.json(result);
    } else {
      // Delete like if user has already liked the post
      const result = await prisma.heart.delete({
        where: {
          id: alreadyLiked.id,
        },
      });
      return NextResponse.json(result);
    }
  } catch (err) {
    NextResponse.error();
  }
}
