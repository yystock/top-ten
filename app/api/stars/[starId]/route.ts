import * as z from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { StarValidator } from "@/lib/validations/star";

const routeContextSchema = z.object({
  params: z.object({
    starId: z.coerce.number(),
  }),
});

export async function DELETE(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    const user = await getCurrentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    await db.star.delete({
      where: {
        id: params.starId,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.log("[STAR_DELETE]", error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function PATCH(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);
    const user = await getCurrentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = StarValidator.parse(json);

    await db.star.update({
      where: {
        id: params.starId,
      },
      data: {
        name: body.name,
        picture: body.picture,
        vote: body.vote,
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    console.log("[STAR_PATCH]", error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
