import z from "zod";

export const recentLeadSchema = z.object({
  _id: z.string(),
  id: z.number(),
  masterId: z.number(),
  password: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
