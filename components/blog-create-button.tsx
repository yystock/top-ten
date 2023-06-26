"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/Button";
import toast from "react-hot-toast";
import { BiLoader, BiPlus } from "react-icons/bi";

interface PostCreateButtonProps extends ButtonProps {}

export function PostCreateButton({ className, variant, ...props }: PostCreateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onClick() {
    setIsLoading(true);

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Post",
      }),
    });

    setIsLoading(false);

    if (!response?.ok) {
      if (response.status === 402) {
        return toast.error("Limit of 3 posts reached.");
      }

      return toast.error("Your post was not created. Please try again.");
    }

    const post = await response.json();

    // This forces a cache invalidation.
    router.refresh();

    router.push(`/editor/${post.id}`);
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <BiLoader className="mr-2 h-4 w-4 animate-spin" /> : <BiPlus className="mr-2 h-4 w-4" />}
      New post
    </button>
  );
}
