import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <Card className="p-4">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 *:rounded-lg">
          <Skeleton className="h-3 w-24 bg-gray-300" />
          <Skeleton className="h-3 w-48 bg-gray-300" />
        </div>
        <div className="flex gap-2 *:rounded-lg">
          <Skeleton className="h-7 w-24 bg-gray-300" />
          <Skeleton className="h-7 w-24 bg-gray-300" />
        </div>
      </div>
      <Card className="mt-0.5 mb-4 bg-gray-100">
        {Array.from({ length: 10 }).map((_) => (
          <div className="flex gap-5 px-3" key={`skeleton-row-${_}-${Math.random()}`}>
            <Skeleton className="h-7 w-full bg-gray-300" />
            <Skeleton className="h-7 w-full bg-gray-300" />
            <Skeleton className="h-7 w-full bg-gray-300" />
            <Skeleton className="h-7 w-full bg-gray-300" />
            <Skeleton className="h-7 w-full bg-gray-300" />
          </div>
        ))}
      </Card>
      <div className="flex justify-end">
        <div className="flex gap-2">
          <Skeleton className="h-7 w-32 bg-gray-300" />
          <Skeleton className="h-7 w-32 bg-gray-300" />
        </div>
      </div>
    </Card>
  );
};

export default Loading;
