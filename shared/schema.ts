import { z } from "zod";

export const htmlContentSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
});

export type HtmlContent = z.infer<typeof htmlContentSchema>;
