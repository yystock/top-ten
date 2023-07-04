import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string | null;
    role: string;
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    username: string | null;
    role: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
