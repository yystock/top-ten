"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Blog } from "@prisma/client";
import { BlogOperations } from "@/app/(admin)/dashboard/blogs/BlogOperations";

export const columns: ColumnDef<Blog>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "published",
    header: "Published",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const blog = row.original;

      return <BlogOperations blogId={blog.id} />;
    },
  },
];
