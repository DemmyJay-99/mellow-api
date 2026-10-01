import { z } from "zod";

export const pluginSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  author: z.string().min(1),
  gist_url: z.string().url(),
  // like_count: z.number().int().nonnegative()
});

export const statusSchema = z.object({
  status: z.enum(["approved", "rejected"]),
});

export type AddPluginBody = z.infer<typeof pluginSchema>;
