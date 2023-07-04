import { z } from "zod";

export const PostHeartValidator = z.object({
  postId: z.string(),
});

export type PostHeartRequest = z.infer<typeof PostHeartValidator>;

export const CommentHeartValidator = z.object({
  commentId: z.string(),
});

export type CommentHeartRequest = z.infer<typeof CommentHeartValidator>;
