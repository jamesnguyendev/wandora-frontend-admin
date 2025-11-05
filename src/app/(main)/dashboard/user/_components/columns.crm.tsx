import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import z from "zod";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DeleteConfirm } from "./delete-confirm";
import { recentLeadSchema } from "./schema";
import { UpdateUser } from "./update-user";

export const recentLeadsColumns: ColumnDef<z.infer<typeof recentLeadSchema>>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <span>{row.original.email}</span>,
    enableSorting: true,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.role}</span>,
    enableSorting: true,
  },
  {
    accessorKey: "verified",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Verified" />,
    cell: ({ row }) => {
      const verified = row.original.verified ? "Verified" : "Unverified";

      return <span className="text-muted-foreground tabular-nums">{verified}</span>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created at" />,
    cell: ({ row }) => {
      const date = row.original.createdAt ? new Date(row.original.createdAt) : "No data";

      return <span className="text-muted-foreground tabular-nums">{date.toLocaleString()}</span>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Updated at" />,
    cell: ({ row }) => {
      const date = row.original.updatedAt ? new Date(row.original.updatedAt) : "No data";
      return <span className="text-muted-foreground tabular-nums">{date.toLocaleString()}</span>;
    },
    enableSorting: true,
  },
  {
    header: "actions",
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
            <EllipsisVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <UpdateUser item={row.original} />
          <DropdownMenuSeparator />
          <DeleteConfirm id={row.original.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];
