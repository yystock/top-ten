import * as z from "zod";

export const userLoginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required").min(8, "Password must have more than 8 characters"),
});

export const userRegisterValidator = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(1, "Password is required").min(8, "Password must have more than 8 characters"),
});
