"use client";
import { signOut } from "next-auth/react";

import Avatar from "../Avatar";
import { User } from "next-auth";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
interface UserMenuProps {
  currentUser?: Pick<User, "name" | "image" | "email">;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center">
          <Avatar src={currentUser?.image} height={30} width={30} />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-background" align="end">
        {currentUser ? (
          <>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                {currentUser.name && <p className="font-medium">{currentUser.name}</p>}
                {currentUser.email && <p className="w-[200px] truncate text-sm text-muted-foreground">{currentUser.email}</p>}
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account">Account</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/my-post">My Posts</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/create">Create</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={(event) => {
                event.preventDefault();
                signOut({
                  callbackUrl: `${window.location.origin}/login`,
                });
              }}
            >
              Sign out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/login">Login</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/sign-up">Sign Up</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
