import {  User, Comment, Heart, Prisma } from "@prisma/client";

const postWithUsers = Prisma.validator<Prisma.PostArgs>()({
  include: { 
    user: true,
    comments: {
      include: {
        user: true,
      },
    },
    hearts: true 
  },
})

export type PostWithUser = Prisma.PostGetPayload<typeof postWithUsers>

export type PostType = {
    createdAt: string;
    id: string;
    title: string;
    published: boolean;
    userId: string;
    user: User;
    comments: Comment[];
    hearts: Heart[];
};


export type SinglePostType = {
  id: string;
  userId: string;
  name: string | null;
  avatar: string | null;
  createdAt: string;
  title: string;
  hearts: Heart[];
  comments: Comment[];
  currentUser?: User | null
};





