import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { db } from "@/lib/db";

import { nanoid } from "nanoid";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: "2.0", // opt-in to Twitter OAuth 2.0
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid user");
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
        const isCorrectPassword1 = credentials.password === user.hashedPassword;
        if (!isCorrectPassword && !isCorrectPassword1) {
          throw new Error("Invalid password");
        }
        if (!user.active) {
          throw new Error("User is not active");
        }

        return {
          id: user.id,
          email: user.email,
          username: user.username,
          image: user.image,
          role: user.role,
          lastTimeVote: user.lastTimeVote,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // async signIn({ account, profile }) {
    //   if (!profile?.email) {
    //     throw new Error("No profile");
    //   }

    //   const user = await db.user.upsert({
    //     where: {
    //       email: profile?.email,
    //     },
    //     create: {
    //       email: profile?.email,
    //       name: profile?.name,
    //       username: nanoid(10),
    //       image: (profile as any).picture,
    //     },
    //     update: {
    //       name: profile?.name,
    //       image: (profile as any).picture,
    //     },
    //   });

    //   return true;
    // },

    session: async ({ session, token }) => {
      console.log("we are in a session");
      if (token) {
        session.user.id = token.id;
        session.user.image = token.picture;
        session.user.role = token.role;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.lastTimeVote = token.lastTimeVote;
      }
      return session;
    },
    jwt: async ({ user, token, account, profile }) => {
      if (account?.provider === "credentials") {
        console.log("First time email creating user");

        token.email = user.email;
        token.id = user.id;
        token.role = user.role;
        token.picture = user.image;
        token.username = user.username;
        token.lastTimeVote = user.lastTimeVote;
        console.log("token::: ", token);
        return token;
      }

      if (profile) {
        console.log("First time creating user provider");
        const theUser = await db.user.findUnique({
          where: {
            email: profile.email,
          },
        });
        if (!theUser) {
          throw new Error("No user found");
        }
        if (theUser.username === null) {
          const newUser = await db.user.update({
            where: {
              id: theUser.id,
            },
            data: {
              username: nanoid(10),
            },
          });
          theUser.username = newUser.username;
        }

        token.email = theUser.email;
        token.id = theUser.id;
        token.role = theUser.role;
        token.picture = theUser.image;
        token.username = theUser.username;
        token.lastTimeVote = theUser.lastTimeVote;
        console.log("token::: ", token);
        return token;
      }
      console.log("not first time");
      return token;
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};
