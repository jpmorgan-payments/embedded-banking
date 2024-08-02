import { z } from 'zod';

export const InitialFormSchema = z.object({
  organizationName: z.string().min(1, 'Organization name is required'),
  organizationType: z.enum([
    'LIMITED_LIABILITY_COMPANY',
    'C_CORPORATION',
    'S_CORPORATION',
    'PARTNERSHIP',
    'PUBLICLY_TRADED_COMPANY',
    'NON_PROFIT_CORPORATION',
    'GOVERNMENT_ENTITY',
    'SOLE_PROPRIETORSHIP',
    'UNINCORPORATED_ASSOCIATION',
  ]),
});
