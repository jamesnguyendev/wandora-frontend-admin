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
import { UpdateBooking } from "./update-booking";

export const recentLeadsColumns: ColumnDef<z.infer<typeof recentLeadSchema>>[] = [
  {
    accessorKey: "startDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Start date" />,
    cell: ({ row }) => {
      const date = row.original.startDate ? new Date(row.original.startDate) : "No data";

      return <span className="text-muted-foreground tabular-nums">{date.toLocaleString()}</span>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="End date" />,
    cell: ({ row }) => {
      const date = row.original.endDate ? new Date(row.original.endDate) : "No data";

      return <span className="text-muted-foreground tabular-nums">{date.toLocaleString()}</span>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total price" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.totalPrice}</span>,
    enableSorting: false,
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
    header: "Actions",
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
          <UpdateBooking item={row.original} />
          <DropdownMenuSeparator />
          <DeleteConfirm id={row.original.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];
