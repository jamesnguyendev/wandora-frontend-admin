import Image from "next/image";

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

import { TourConfirm } from "./delete-confirm";
import { recentLeadSchema } from "./schema";
import UpdateTour from "./update-tour";
import UploadImageTour from "./upload-image-tour";

export const recentLeadsColumns: ColumnDef<z.infer<typeof recentLeadSchema>>[] = [
  {
    accessorKey: "imageUrl",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Image" />,
    cell: ({ row }) => {
      const img = row.original.imageUrl;

      if (!img) return <span>No Avatar</span>;

      return <Image src={img} alt="" width={80} height={40} className="rounded-sm object-contain" />;
    },
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => <span>{row.original.title}</span>,
    enableSorting: true,
  },
  {
    accessorKey: "description",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.description}</span>,
    enableSorting: false,
  },
  {
    accessorKey: "latitude",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Latitude" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.latitude}</span>,
    enableSorting: true,
  },
  {
    accessorKey: "longitude",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Longitude" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.longitude}</span>,
    enableSorting: true,
  },
  {
    accessorKey: "priceBase",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.priceBase}</span>,
    enableSorting: true,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.type}</span>,
    enableSorting: false,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
            <EllipsisVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <UpdateTour item={row.original} />
          <DropdownMenuSeparator />
          <UploadImageTour id={row.original.id} />
          <DropdownMenuSeparator />
          <TourConfirm id={row.original.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];
