import { z } from "zod";

export const UserValidator = z.object({
  username: z.string().min(1),
  image: z.string().min(1),
  role: z.enum(["ADMIN", "USER", "CREATOR"]),
});

export type UserSchema = z.infer<typeof UserValidator>;
