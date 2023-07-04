import * as z from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { UserValidator } from "@/lib/validations/user";

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export async function DELETE(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    const user = await getCurrentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    await db.user.delete({
      where: {
        id: params.userId as string,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.log("[USER_DELETE]", error);
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
    const body = UserValidator.parse(json);

    await db.user.update({
      where: {
        id: params.userId,
      },
      data: {
        username: body.username,
        role: body.role,
        image: body.image,
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    console.log("[USER_PATCH]", error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
