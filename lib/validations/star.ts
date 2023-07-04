import { z } from "zod";

export const StarValidator = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name must be at least 1 characters long",
    })
    .max(128, {
      message: "Name must be less than 128 characters long",
    }),
  picture: z.string(),
  vote: z.coerce.number().min(0),
});

export type StarSchema = z.infer<typeof StarValidator>;
