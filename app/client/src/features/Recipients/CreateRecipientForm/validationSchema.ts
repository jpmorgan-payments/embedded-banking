import * as yup from 'yup';
import type { AccountType, RecipientType } from 'generated-api-models';

export const validationSchema = yup.object({
  type: yup.mixed<RecipientType>().default('INDIVIDUAL' as RecipientType),
  businessName: yup.string().default(''),
  firstName: yup.string().default(''),
  lastName: yup.string().default(''),
  phone: yup.string().default(''),
  email: yup.string().default(''),
  address1: yup.string().default(''),
  address2: yup.string().default(''),
  address3: yup.string().default(''),
  city: yup.string().default(''),
  state: yup.string().default(''),
  zip: yup.string().default(''),
  country: yup.string().default('US'),
  accountType: yup.mixed<AccountType>().default(undefined),
  accountNumber: yup.string().default(''),
  creditorRoutingNumber: yup.string().default(''),
  creditorRoutingCodeType: yup.string().default('USABA'),
  creditorCountryCode: yup.string().default('US'),
});

export type CreateRecipientFormValues = yup.InferType<typeof validationSchema>;
