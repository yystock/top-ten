import { Resend } from "resend";

import bcrypt from "bcrypt";
import UserVerificationEmail from "@/components/emails/UserVerificationEmail";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { userRegisterValidator } from "@/lib/validations/auth";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, username, password } = userRegisterValidator.parse(body);
    const resend = new Resend(process.env.RESEND_API);

    const hashedPassword = await bcrypt.hash(password, 12);

    const userExist = await db.user.findFirst({
      where: {
        email,
      },
    });
    if (userExist && userExist.active) {
      return new Response("User Already exists", { status: 409 });
    }

    if (!userExist) {
      const user = await db.user.create({
        data: {
          email,
          username,
          hashedPassword,
        },
      });

      const token = await db.activateToken.create({
        data: {
          token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
          userId: user.id,
        },
      });

      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Email Verification",
        react: UserVerificationEmail({ token: token.token }),
      });

      return NextResponse.json(user);
    } else {
      const token = await db.activateToken.create({
        data: {
          token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
          userId: userExist?.id,
        },
      });

      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Email Verification",
        react: UserVerificationEmail({ token: token.token }),
      });

      return NextResponse.json("Verification Email has been sent to the user");
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response(`Could not create user ${error.message}`, { status: 500 });
  }
}
