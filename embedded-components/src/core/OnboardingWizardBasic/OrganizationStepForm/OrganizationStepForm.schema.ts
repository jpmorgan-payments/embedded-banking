import { z } from 'zod';





const phoneSchema = z.object({
  phoneType: z.enum(['BUSINESS_PHONE', 'MOBILE_PHONE', 'ALTERNATE_PHONE']),
  countryCode: z.string().regex(/^\+\d{1,3}$/, 'Invalid country code'),
  phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
});

const addressSchema = z.object({
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

const organizationIdSchema = z.object({
  description: z
    .string()
    .max(100, 'Description must be 100 characters or less')
    .optional(),
  idType: z.enum(['EIN', 'BUSINESS_REGISTRATION_ID']),
  value: z
    .string()
    .min(1, 'ID value is required')
    .max(100, 'ID value must be 100 characters or less'),
  issuer: z
    .string()
    .min(1, 'Issuer is required')
    .max(500, 'Issuer must be 500 characters or less'),
  expiryDate: z
    .string()
    .refine(
      (val) => {
        // Check if the string is in 'YYYY-MM-DD' format
        return /^\d{4}-\d{2}-\d{2}$/.test(val);
      },
      {
        message: "Expiry date must be in 'YYYY-MM-DD' format",
      }
    )
    .refine(
      (val) => {
        // Check if the date is valid
        const date = new Date(val);
        return !Number.isNaN(date.getTime());
      },
      {
        message: 'Invalid date',
      }
    )
    .optional(),
});

const associatedCountrySchema = z.object({
  country: z.string().length(2, 'Country code must be exactly 2 characters'),
});

const secondaryMccSchema = z.object({
  mcc: z.string().regex(/^\d{4}$/, 'MCC must be exactly 4 digits'),
});

export const OrganizationStepFormSchema = z
  .object({
    organizationName: z
      .string()
      .min(1, 'Organization name is required')
      .max(100, 'Organization name must be 100 characters or less'),
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
    countryOfFormation: z
      .string()
      .length(2, 'Country code must be exactly 2 characters'),
    email: z.string().email('Invalid email address'),
    yearOfFormation: z
      .string()
      .regex(/^(19|20)\d{2}$/, 'Invalid year of formation'),
    addresses: z
      .array(addressSchema)
      .min(1, 'At least one address is required')
      .max(5, 'Maximum 5 addresses allowed'),
    associatedCountries: z
      .array(associatedCountrySchema)
      .max(100, 'Maximum 100 associated countries allowed')
      .optional()
      .default([]),
    dbaName: z
      .string()
      .max(100, 'DBA name must be 100 characters or less')
      .optional(),
    entitiesInOwnership: z.boolean(),
    industryCategory: z
      .string()
      .max(100, 'Industry category must be 100 characters or less')
      .optional(),
    industryType: z
      .string()
      .max(100, 'Industry type must be 100 characters or less')
      .optional(),
    jurisdiction: z
      .string()
      .length(2, 'Jurisdiction code must be exactly 2 characters'),
    organizationDescription: z
      .string()
      .max(500, 'Organization description must be 500 characters or less')
      .optional(),
    organizationIds: z
      .array(organizationIdSchema)
      .max(6, 'Maximum 6 organization IDs allowed'),
    phone: phoneSchema,
    significantOwnership: z.boolean(),
    tradeOverInternet: z.boolean(),
    websiteAvailable: z.boolean().default(false),
    website: z
      .string()
      .url('Invalid URL')
      .max(500, 'Website URL must be 500 characters or less')
      .optional(),
    mcc: z
      .string()
      .refine((value) => value === '' || /^\d{4}$/.test(value), {
        message: 'MCC must be empty or exactly 4 digits',
      })
      .optional(),
    secondaryMccList: z
      .array(secondaryMccSchema)
      .max(50, 'Maximum 50 secondary MCCs allowed')
      .optional()
      .default([]),
  })
  .refine((data) => !data.websiteAvailable || !!data.website, {
    message: 'Website is required when Website Available is checked',
    path: ['website'],
  });;