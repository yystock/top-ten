import type { Post, User, PostHeart, Comment, CommentHeart } from "@prisma/client";

export type ExtendedPost = Post & {
  hearts: PostHeart[];
  user: User;
  comments: Comment[];
};

export type ExtendedComment = Comment & {
  hearts: CommentHeart[];
  user: User;
};

export type SinglePostType = Post & {
  hearts: PostHeart[];
  user: User;
  comments: ExtendedComment[];
};
