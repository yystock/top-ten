import { db } from "@/lib/db";
import { z } from "zod";
import { getCurrentUser } from "@/lib/session";
import { VoteValidator } from "@/lib/validations/vote";
import isToday from "date-fns/isToday";
import { parseISO } from "date-fns";
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { userId, starId } = VoteValidator.parse(body);
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new Response("Unauthorized", { status: 403 });
    }

    const user = await db.user.findFirst({
      where: {
        id: currentUser?.id,
      },
    });

    if (user?.lastTimeVote && isToday(parseISO(user.lastTimeVote.toISOString()))) {
      return new Response("You have already voted today", { status: 403 });
    }

    const isStar = await db.star.findFirst({
      where: {
        id: starId,
      },
    });

    if (!isStar) {
      return new Response("Star does not exist", { status: 409 });
    }

    const vote = await db.vote.create({
      data: {
        userId,
        starId,
      },
    });
    const updatedStar = await db.star.update({
      where: {
        id: starId,
      },
      data: {
        vote: {
          increment: 1,
        },
      },
    });
    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        lastTimeVote: new Date(),
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
