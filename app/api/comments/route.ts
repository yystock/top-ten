import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const title = body.title;
  const postId = body.postId;

  if (!title) {
    NextResponse.error();
  }
  const comment = await db.comment.create({
    data: {
      title: title,
      userId: currentUser.id,
      postId: postId,
    },
  });

  return NextResponse.json(comment);
}
