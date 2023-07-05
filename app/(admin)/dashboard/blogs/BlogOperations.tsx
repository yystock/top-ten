"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/Dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { toast } from "react-hot-toast";
import { Icons } from "@/components/Icons";
import { Copy, Loader2 } from "lucide-react";

async function deleteBlog(blogId: string) {
  const response = await fetch(`/api/stars/${blogId}`, {
    method: "DELETE",
  });

  if (!response?.ok) {
    toast.error("Something went wrong");
  } else {
    toast.success("Deleted");
    return true;
  }
}

interface BlogOperationsProps {
  blogId: string;
}

export function BlogOperations({ blogId }: BlogOperationsProps) {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Billboard ID copied to clipboard.");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <Icons.ellipsis className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onCopy(blogId)}>
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/dashboard/blogs/b/${blogId}`} className="flex w-full">
              Edit
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this Star?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                setIsDeleteLoading(true);

                const deleted = await deleteBlog(blogId);

                if (deleted) {
                  setIsDeleteLoading(false);
                  setShowDeleteAlert(false);
                  router.refresh();
                }
              }}
              className="bg-red-500 focus:ring-red-500"
            >
              {isDeleteLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Icons.trash className="mr-2 h-4 w-4" />}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
