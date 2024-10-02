import { z } from 'zod';

export const DocumentUploadStepFormSchema = z.object({
  file: z.instanceof(Array<File>),
});
