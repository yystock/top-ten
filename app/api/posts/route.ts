import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  

  const body = await request.json();
  const title = body.title;

  if (!title) {
    NextResponse.error();
  }

  const post = await prisma.post.create({
    data: {
      title: title,
      userId: currentUser.id,
    }
  });

  return NextResponse.json(post);
}