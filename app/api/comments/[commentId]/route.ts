import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { db } from "@/lib/db";

interface IParams {
  commentId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { commentId } = params;

  if (!commentId || typeof commentId !== "string") {
    throw new Error("Invalid ID");
  }

  const comment = await db.comment.deleteMany({
    where: {
      id: commentId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(comment);
}
