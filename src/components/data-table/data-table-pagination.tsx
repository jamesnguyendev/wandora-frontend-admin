import { Table } from "@tanstack/react-table";
import { ChevronRight, ChevronsRight, ChevronLeft, ChevronsLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  onLimitChange?: (newLimit: number) => void;
}

export function DataTablePagination<TData>({ table, onLimitChange }: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const canPreviousPage = table.getCanPreviousPage();
  const canNextPage = pageIndex + 1 < pageCount;

  return (
    <div className="flex items-center justify-between px-4">
      <div className="hidden flex-1 text-sm text-transparent lg:flex">
        {table.getFilteredSelectedRowModel().rows.length} / {table.getFilteredRowModel().rows.length} Selected.
      </div>

      <div className="flex w-full items-center gap-8 lg:w-fit">
        {/* Rows per page */}
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Rows per page
          </Label>
          <Select
            value={String(table.getState().pagination.pageSize)}
            onValueChange={(value) => {
              const newLimit = Number(value);
              table.setPageSize(newLimit);
              table.setPageIndex(0);
              onLimitChange?.(newLimit);
            }}
          >
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue />
            </SelectTrigger>

            <SelectContent side="top">
              {[5, 10, 20, 30, 50].map((pageSize) => {
                return (
                  <SelectItem key={pageSize} value={String(pageSize)}>
                    {pageSize}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Page indicator */}
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          {pageIndex + 1} / {pageCount > 0 ? pageCount : "?"}
        </div>

        {/* Pagination buttons */}
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">First page</span>
            <ChevronsLeft />
          </Button>

          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft />
          </Button>

          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!canNextPage}
          >
            <span className="sr-only">Next</span>
            <ChevronRight />
          </Button>

          <Button
            variant="outline"
            className="hidden size-8 lg:flex"
            size="icon"
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!canNextPage}
          >
            <span className="sr-only">Last</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
