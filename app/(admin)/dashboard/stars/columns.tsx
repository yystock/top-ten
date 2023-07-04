"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Star } from "@prisma/client";
import { StarOperations } from "@/app/(admin)/dashboard/stars/StarOperations";

export const columns: ColumnDef<Star>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "picture",
    header: "Picture",
  },
  {
    accessorKey: "vote",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Vote
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const star = row.original;
      return <StarOperations starId={star.id} />;
    },
  },
];
