import * as yup from 'yup';

const businessDetailsSchema = yup.object({
  businessName: yup.string().default('').required(),
  ein: yup
    .string()
    .default('')
    .matches(/^[1-9]\d?-\d{7}$/, 'Please enter a valid EIN (xx-xxxxxxx)')
    .required(),
  yearOfFormation: yup
    .number()
    .default(undefined)
    .max(
      new Date().getFullYear() + 1,
      'Year of formation cannot be in the future',
    )
    .required('Please enter a year of formation'),
  website: yup
    .string()
    .default('')
    .when('websiteNotAvailable', {
      is: false,
      then: (schema) =>
        schema
          .url()
          .required(
            'Please enter a business website OR confirm that you do not have one.',
          ),
    }),
  websiteNotAvailable: yup.boolean().default(false),
  businessDescription: yup.string().default('').required(),
  businessAddress: yup.string().default('').required(),
  businessCity: yup.string().default('').required(),
  businessState: yup.string().default('').required(),
  businessZipCode: yup
    .string()
    .default('')
    .matches(/^\d{5}(?:[-\s]\d{4})?$/, 'Please enter a valid ZIP Code')
    .required(),
  businessPhone: yup
    .string()
    .default('')
    .matches(/^\d{10}$/, 'Please enter a valid phone number')
    .required(),
  industryType: yup.string().default(''),
  industryCategory: yup.string().default(''),
});

type BusinessDetailsStepValues = yup.InferType<typeof businessDetailsSchema>;

const soleProprietorBusinessDetailsSchema = businessDetailsSchema
  .omit(['businessName', 'ein'])
  .concat(
    yup.object({
      businessName: yup.string().default('').optional(),
      ein: yup
        .string()
        .default('')
        .matches(/^[1-9]\d?-\d{7}$/, {
          message: 'Please enter a valid EIN (xx-xxxxxxx)',
          excludeEmptyString: true,
        })
        .optional(),
      idk: yup.string(),
    }),
  );

type SoleProprietorBusinessDetailsStepValues = yup.InferType<
  typeof soleProprietorBusinessDetailsSchema
>;

export { businessDetailsSchema, soleProprietorBusinessDetailsSchema };
export type {
  BusinessDetailsStepValues,
  SoleProprietorBusinessDetailsStepValues,
};
