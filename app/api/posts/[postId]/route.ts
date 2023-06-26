import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { db } from "@/lib/db";

interface IParams {
  postId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { postId } = params;

  if (!postId || typeof postId !== "string") {
    throw new Error("Invalid ID");
  }

  const post = await db.post.deleteMany({
    where: {
      id: postId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(post);
}
