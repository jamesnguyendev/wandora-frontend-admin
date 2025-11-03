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

import { MasterConfirm } from "./delete-confirm";
import { recentLeadSchema } from "./schema";
import UpdateProfit from "./update-profit";

export const recentLeadsColumns: ColumnDef<z.infer<typeof recentLeadSchema>>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
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
    accessorKey: "profit",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Lợi nhuận" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.profit}</span>,
    enableSorting: true,
    meta: { title: "Lợi nhuận" },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày tạo" />,
    cell: ({ row }) => {
      const date = row.original.createdAt ? new Date(row.original.createdAt) : "Không dữ liệu";

      return <span className="text-muted-foreground tabular-nums">{date.toLocaleString()}</span>;
    },
    enableSorting: true,
    meta: { title: "Ngày tạo" },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày cập nhật" />,
    cell: ({ row }) => {
      const date = row.original.updatedAt ? new Date(row.original.updatedAt) : "Không dữ liệu";

      return <span className="text-muted-foreground tabular-nums">{date.toLocaleString()}</span>;
    },
    enableSorting: true,
    meta: { title: "Ngày cập nhật" },
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
            <EllipsisVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <UpdateProfit item={row.original} />
          <DropdownMenuSeparator />
          <MasterConfirm id={row.original.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];
