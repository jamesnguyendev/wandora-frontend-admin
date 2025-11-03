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
import { UpdateFollower } from "./update-follower";

export const recentLeadsColumns: ColumnDef<z.infer<typeof recentLeadSchema>>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Follower ID" />,
    cell: ({ row }) => <span>{row.original.id}</span>,
    enableSorting: true,
  },
  {
    accessorKey: "masterId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Master ID" />,
    cell: ({ row }) => <span>{row.original.masterId}</span>,
    enableSorting: true,
  },
  {
    accessorKey: "password",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Mật khẩu" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.password}</span>,
    meta: { title: "Mật khẩu" },
    enableSorting: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày tạo" />,
    meta: { title: "Ngày tạo" },
    cell: ({ row }) => {
      const date = row.original.createdAt ? new Date(row.original.createdAt) : "Không dữ liệu";

      return <span className="text-muted-foreground tabular-nums">{date.toLocaleString()}</span>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày cập nhật" />,
    meta: { title: "Ngày update" },
    cell: ({ row }) => {
      const date = row.original.updatedAt ? new Date(row.original.updatedAt) : "Không dữ liệu";
      return <span className="text-muted-foreground tabular-nums">{date.toLocaleString()}</span>;
    },
    enableSorting: true,
  },
  {
    header: "Hành động",
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
          <UpdateFollower item={row.original} />
          <DropdownMenuSeparator />
          <DeleteConfirm id={row.original.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];
