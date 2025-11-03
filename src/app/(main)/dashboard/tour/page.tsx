import { getTours } from "@/actions";

import { TableCards } from "./_components/table-cards";

export default async function Page() {
  const tours = await getTours();
  if (!tours) {
    return <div>No tours</div>;
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <TableCards data={tours} />
    </div>
  );
}
