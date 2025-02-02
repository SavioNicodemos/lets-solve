import { z } from 'zod';

export const IImageUploadSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  uri: z.string(),
  path: z.string(),
  isExternal: z.literal(false),
  type: z.string(),
});
