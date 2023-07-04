import { db } from "@/lib/db";
import { StarValidator } from "@/lib/validations/star";
import { z } from "zod";
import { getCurrentUser } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, vote, picture } = StarValidator.parse(body);
    const user = await getCurrentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const isStar = await db.star.findFirst({
      where: {
        name: name,
      },
    });

    if (isStar) {
      return new Response("Star is already existed", { status: 409 });
    }

    const star = await db.star.create({
      data: {
        picture: picture,
        name: name,
        vote: vote,
      },
    });
    return new Response("OK");
  } catch (error) {
    console.log("[STARS_POST]", error);

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Could not create a star right now. Please try later", { status: 500 });
  }
}
