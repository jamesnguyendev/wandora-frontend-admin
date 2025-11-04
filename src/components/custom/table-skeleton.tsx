import { Skeleton } from "../ui/skeleton";

const TableSkeleton = () => {
  return (
    <div className="bg-secondary flex flex-col gap-3 py-4">
      {Array.from({ length: 5 }).map((_) => (
        <div className="flex gap-5 px-3" key={`skeleton-row-${_}-${Math.random()}`}>
          <Skeleton className="bg-background h-7 w-full" />
          <Skeleton className="bg-background h-7 w-full" />
          <Skeleton className="bg-background h-7 w-full" />
          <Skeleton className="bg-background h-7 w-full" />
          <Skeleton className="bg-background h-7 w-full" />
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
