import { getBookings } from "@/actions";

import { TableCards } from "./_components/table-cards";

export default async function Page() {
  const bookings = await getBookings();
  if (!bookings) {
    return <div>No bookings</div>;
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <TableCards data={bookings} />
    </div>
  );
}
