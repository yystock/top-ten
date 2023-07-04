import { z } from "zod";

export const BlogValidator = z.object({
  slug: z
    .string()
    .min(3, {
      message: "Slug must be at least 3 characters long",
    })
    .max(128, {
      message: "Slug must be less than 128 characters long",
    }),
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters long",
    })
    .max(128, {
      message: "Title must be less than 128 characters long",
    }),
  imgSrc: z.string(),
  content: z.any().optional(),
  category: z.string(),
  published: z.boolean().optional(),
  star: z.string().optional(),
});

export type BlogSchema = z.infer<typeof BlogValidator>;
