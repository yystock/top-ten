"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { User } from "@prisma/client";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">CreatedAt</div>,
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date;
      const formatted = createdAt.toLocaleString();

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-right">UpdatedAt</div>,
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt") as Date;
      const formatted = updatedAt.toLocaleString();

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];
