import z from "zod";

export const recentLeadSchema = z.object({
  id: z.string(),
  userId: z.string(),
  listingId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  totalPrice: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
