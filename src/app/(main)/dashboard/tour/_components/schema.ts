import z from "zod";

export const recentLeadSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  priceBase: z.number(),
  type: z.enum(["room", "experience"]),
  imageUrl: z.string().optional(),
});
