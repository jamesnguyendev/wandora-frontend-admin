"use client";

import DebouncedInput from "@/components/custom/debounce-input";
import AddUser from "@/components/dashboard/user/add-user";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction } from "@/components/ui/card";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { recentLeadsColumns } from "./columns.crm";

interface user {
  _id: string;
  name: string;
  email: string;
  phone: string;
  verify: string;
  createdAt: string;
  updatedAt: string;
}

export function TableCards({ data }: { data: user[] }) {
  const table = useDataTableInstance({
    data: data,
    columns: recentLeadsColumns,
    getRowId: (row, index) => row._id || index.toString(),
  });

  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs">
      <Card>
        <CardHeader>
          <CardTitle>Người dùng gần đây</CardTitle>
          <CardDescription>Theo dõi và quản lý trạng thái của họ.</CardDescription>
          <CardAction>
            <div className="flex items-center gap-2">
              <DebouncedInput
                value={table.getState().globalFilter ?? ""}
                onChange={(value) => table.setGlobalFilter(String(value))}
                className="col-span-4 h-8 w-full gap-1.5 rounded-md border px-3 text-sm font-medium outline-none has-[>svg]:px-2.5"
                placeholder="Tìm: Tên, email, Sđt."
              />
              <DataTableViewOptions table={table} />
              <AddUser />
            </div>
          </CardAction>
        </CardHeader>
        <CardContent className="flex size-full flex-col gap-4">
          <div className="overflow-hidden rounded-md border">
            <DataTable table={table} columns={recentLeadsColumns} />
          </div>
          <div className="flex flex-col justify-between gap-1.5 md:flex-row">
            <div className="px-4 text-sm font-medium">Tổng số người dùng: {table.getRowCount()}</div>
            <DataTablePagination table={table} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
