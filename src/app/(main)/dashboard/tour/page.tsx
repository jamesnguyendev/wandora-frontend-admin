import { TableCards } from "./_components/table-cards";

export default async function Page() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <TableCards />
    </div>
  );
}
