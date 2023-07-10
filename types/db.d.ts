import type { Post, User, PostHeart, Comment, CommentHeart, UserRole } from "@prisma/client";

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

export type UserSubscriptionPlan = Pick<User, "subscription" | "stripePriceId" | "stripeCustomerId" | "stripeSubscriptionId"> & {
  stripeCurrentPeriodEnd?: number;
};

export type SubscriptionPlan = {
  name: string;
  description: string;
  price: number;
  stripePriceId: string;
};
