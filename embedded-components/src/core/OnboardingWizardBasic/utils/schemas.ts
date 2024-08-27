import { z } from 'zod';

export const PhoneSchema = z.object({
  phoneType: z.enum(['BUSINESS_PHONE', 'MOBILE_PHONE', 'ALTERNATE_PHONE']),
  countryCode: z
    .string()
    .regex(/^(0{2}|\+)?[1-9]{1,3}$/, 'Invalid country code'),
  phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
});

export const AddressSchema = z.object({
  addressType: z.enum([
    'LEGAL_ADDRESS',
    'MAILING_ADDRESS',
    'BUSINESS_ADDRESS',
    'RESIDENTIAL_ADDRESS',
  ]),
  addressLines: z
    .array(z.string().max(60, 'Address line must be 60 characters or less'))
    .min(1)
    .max(5),
  city: z.string().max(34, 'City name must be 34 characters or less'),
  state: z
    .string()
    .max(30, 'State name must be 30 characters or less')
    .optional(),
  postalCode: z.string().max(10, 'Postal code must be 10 characters or less'),
  country: z.string().length(2, 'Country code must be exactly 2 characters'),
});
