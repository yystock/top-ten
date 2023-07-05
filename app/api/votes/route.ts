import { db } from "@/lib/db";
import { z } from "zod";
import { getCurrentUser } from "@/lib/session";
import { VoteValidator } from "@/lib/validations/vote";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { userId, starId } = VoteValidator.parse(body);
    const user = await getCurrentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const isStar = await db.star.findFirst({
      where: {
        id: starId,
      },
    });

    if (!isStar) {
      return new Response("Star does not exist", { status: 409 });
    }

    const star = await db.vote.create({
      data: {
        userId,
        starId,
      },
    });
    return new Response("OK");
  } catch (error) {
    console.log("[VOTE_POST]", error);

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Could not create a vote right now. Please try later", { status: 500 });
  }
}
