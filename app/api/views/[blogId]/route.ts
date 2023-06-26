import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const id = body.data.id;

  if (!id) {
    NextResponse.error();
  }
  const blog = await db.blog.update({
    where: {
      id: id,
    },
    data: {
      views: { increment: 1 },
    },
  });

  return NextResponse.json(blog);
}
