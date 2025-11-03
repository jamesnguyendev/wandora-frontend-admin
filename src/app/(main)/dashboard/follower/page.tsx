import { getFollowers } from "@/actions";

import { TableCards } from "./_components/table-cards";

export default async function Page() {
  const followers = await getFollowers();
  if (!followers) {
    return <div>Không có follower</div>;
  }
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* <OverviewCards /> */}
      {/* <InsightCards /> */}
      {/* <OperationalCards /> */}
      <TableCards data={followers} />
    </div>
  );
}
