import { z } from "zod";

export const VoteValidator = z.object({
  starId: z.number(),
  userId: z.string(),
});

export type VoteSchema = z.infer<typeof VoteValidator>;
