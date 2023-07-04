"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@prisma/client";
import { UserOperations } from "@/app/(admin)/dashboard/users/UserOperations";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "username",
    header: "Username",
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
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return <UserOperations userId={user.id} />;
    },
  },
];
