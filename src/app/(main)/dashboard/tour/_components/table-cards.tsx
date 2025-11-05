"use client";
import { useState, useEffect, useCallback } from "react";

import { getTours } from "@/actions";
import DebouncedInput from "@/components/custom/debounce-input";
import TableSkeleton from "@/components/custom/table-skeleton";
import AddTour from "@/components/dashboard/tour/add-tour";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction } from "@/components/ui/card";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { tour } from "@/types/tour";

import { recentLeadsColumns } from "./columns.crm";

export function TableCards() {
  const [data, setData] = useState<tour[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState<number>(-1);
  const pageSize = 10;

  const fetchPage = useCallback(
    async (page: number, limit = pageSize) => {
      try {
        setLoading(true);

        const res = await getTours(page, limit);

        setData(res.data || []);

        setPageCount(res.totalPages ?? -1);
      } catch (err) {
        console.error("Error fetching tours:", err);
      } finally {
        setLoading(false);
      }
    },
    [pageSize],
  );

  const table = useDataTableInstance({
    data,
    columns: recentLeadsColumns,
    manualPagination: true,
    pageCount,
    getRowId: (row, index) => row.id || index.toString(),
    onPaginationChange: async (updater) => {
      const newState = typeof updater === "function" ? updater(table.getState().pagination) : updater;
      await fetchPage(newState.pageIndex + 1);
    },
  });

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs">
      <Card>
        <CardHeader>
          <CardTitle className="hidden xl:block">Data recent</CardTitle>
          <CardDescription className="hidden xl:block">Follow and manage their state.</CardDescription>
          <CardAction>
            <div className="flex items-center gap-2">
              <DebouncedInput
                value={table.getState().globalFilter ?? ""}
                onChange={(value) => table.setGlobalFilter(String(value))}
                className="col-span-4 h-8 w-full gap-1.5 rounded-md border px-3 text-sm font-medium outline-none has-[>svg]:px-2.5"
                placeholder="Search by: Title, Type, Description"
              />
              <DataTableViewOptions table={table} />
              <AddTour />
            </div>
          </CardAction>
        </CardHeader>

        <CardContent className="flex size-full flex-col gap-4">
          <div className="overflow-hidden rounded-md border">
            {loading ? <TableSkeleton /> : <DataTable table={table} columns={recentLeadsColumns} />}
          </div>

          <div className="flex flex-col justify-between gap-1.5 md:flex-row">
            <div className="px-4 text-sm font-medium">Tour totals: {data.length} / page</div>
            <DataTablePagination table={table} onLimitChange={(newLimit) => fetchPage(1, newLimit)} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
