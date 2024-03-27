import { z } from 'zod';

export const LinkAccountFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  businessName: z.string().min(1, 'Business name is required'),
  accountType: z.enum(['individual', 'business'], {
    required_error: 'Account type is required',
  }),
  routingNumber: z
    .string()
    .min(9, 'Routing number must be 9 digits')
    .max(9, 'Routing number must be 9 digits'),
  accountNumber: z.string().min(1, 'Account number is required'),
});

export type LinkAccountFormDataType = z.infer<typeof LinkAccountFormSchema>;
