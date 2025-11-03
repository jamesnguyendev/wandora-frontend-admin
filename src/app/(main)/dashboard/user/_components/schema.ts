import z from "zod";

export const recentLeadSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  verify: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
