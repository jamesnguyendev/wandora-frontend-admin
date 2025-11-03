import type { ColumnDef } from "@tanstack/react-table";

import { dragColumn } from "./drag-column";

export function withDndColumn<T extends { _id: string }>(columns: ColumnDef<T>[]): ColumnDef<T>[] {
  return [dragColumn<T>(), ...columns];
}
