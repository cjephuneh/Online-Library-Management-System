import { z } from "zod";

export const schema = z.object({
  name: z.string(),
  photo: z.string(),
  summary: z.string(),
  releases_time: z.string(),
  rating: z.string(),
});

export type AdminBookDataType = z.infer<typeof schema>;
