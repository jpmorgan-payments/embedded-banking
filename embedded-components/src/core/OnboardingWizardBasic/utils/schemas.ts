import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

import { PhoneSmbdoPhoneType } from '@/api/generated/smbdo.schemas';

export const PhoneTypeSchema: z.ZodType<PhoneSmbdoPhoneType> = z.enum([
  'BUSINESS_PHONE',
  'MOBILE_PHONE',
  'ALTERNATE_PHONE',
]);

export const PhoneSchema = z
  .object({
    phoneType: PhoneTypeSchema,
    countryCode: z.string(),
    phoneNumber: z.string(),
  })
  .refine((val) => isValidPhoneNumber(val.countryCode + val.phoneNumber), {
    message: 'Invalid phone number',
  });

const AddressLineSchema = z
  .string()
  .min(1, 'Address line is required')
  .max(60, 'Address line must be 60 characters or less');

export const AddressSchema = z.object({
  addressType: z.enum([
    'LEGAL_ADDRESS',
    'MAILING_ADDRESS',
    'BUSINESS_ADDRESS',
    'RESIDENTIAL_ADDRESS',
  ]),
  addressLines: z.array(AddressLineSchema).min(1).max(5),
  city: z.string().max(34, 'City name must be 34 characters or less'),
  state: z
    .string()
    .max(30, 'State name must be 30 characters or less')
    .optional(),
  postalCode: z.string().max(10, 'Postal code must be 10 characters or less'),
  country: z.string().length(2, 'Country code must be exactly 2 characters'),
});
