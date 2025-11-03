import { getProfits } from "@/actions";

import { TableCards } from "./_components/table-cards";

export default async function Page() {
  const profits = await getProfits();
  if (!profits) {
    return <div>Không có profits</div>;
  }
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <TableCards data={profits} />
    </div>
  );
}
