import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, vote, imageSrc } = body;

  if (!imageSrc || !name || !vote) {
    return NextResponse.error();
  }

  const star = await prisma.star.create({
    data: {
      profile: imageSrc,
      name: name,
      vote: +vote as number,
    },
  });
  return NextResponse.json(star);
}
