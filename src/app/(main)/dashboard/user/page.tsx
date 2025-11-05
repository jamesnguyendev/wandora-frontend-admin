import { notFound } from "next/navigation";

import { getUsers } from "@/actions";

import { TableCards } from "./_components/table-cards";

export default async function Page() {
  const users = await getUsers();

  if (!users) return notFound();

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <TableCards data={users} />
    </div>
  );
}
