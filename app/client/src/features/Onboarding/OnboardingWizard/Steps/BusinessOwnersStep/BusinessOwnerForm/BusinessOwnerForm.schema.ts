import * as yup from 'yup';

export const businessOwnerFormSchema = yup.object({
  firstName: yup.string().default('').required(),
  middleName: yup.string().default(''),
  lastName: yup.string().default('').required(),
  email: yup.string().email().default('').required(),
  address: yup.string().default('').required(),
  city: yup.string().default('').required(),
  state: yup.string().default('').required(),
  zipCode: yup
    .string()
    .default('')
    .matches(/^\d{5}(?:[-\s]\d{4})?$/, 'Please enter a valid ZIP Code')
    .required(),
  phone: yup
    .string()
    .default('')
    .matches(/^\d{10}$/, 'Please enter a valid phone number')
    .required(),
  birthDate: yup.date().default(undefined).required(),
  ssn4: yup
    .string()
    .default('')
    .matches(/^\d{4}$/)
    .required(),
});

export type BusinessOwnerFormValues = yup.InferType<
  typeof businessOwnerFormSchema
>;
