import { z } from 'zod';

export const InitialFormSchema = z.object({
  organizationName: z.string().min(1, 'Organization name is required'),
  organizationType: z.string(),
});
