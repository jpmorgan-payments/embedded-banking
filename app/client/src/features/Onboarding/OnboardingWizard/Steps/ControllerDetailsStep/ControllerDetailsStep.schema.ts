import * as yup from 'yup';

const controllerDetailsSchema = yup.object({
  controllerFirstName: yup.string().default('').required(),
  controllerMiddleName: yup.string().default(''),
  controllerLastName: yup.string().default('').required(),
  controllerEmail: yup.string().email().default('').required(),
  controllerJobTitle: yup.string().default('').required(),
  controllerAddress: yup.string().default('').required(),
  controllerCity: yup.string().default('').required(),
  controllerState: yup.string().default('').required(),
  controllerZipCode: yup
    .string()
    .default('')
    .matches(/^\d{5}(?:[-\s]\d{4})?$/, 'Please enter a valid ZIP Code')
    .required(),
  controllerPhone: yup
    .string()
    .default('')
    .matches(/^\d{10}$/, 'Please enter a valid phone number')
    .required(),
  controllerBirthDate: yup.date().default(undefined).required(),
  controllerSsn4: yup
    .string()
    .default('')
    .matches(/^\d{4}$/)
    .required(),
});

type ControllerDetailsStepValues = yup.InferType<
  typeof controllerDetailsSchema
>;

const soleProprietorControllerDetailsSchema = controllerDetailsSchema
  .omit([
    'controllerJobTitle',
    'controllerAddress',
    'controllerCity',
    'controllerState',
    'controllerZipCode',
    'controllerSsn4',
  ])
  .concat(
    yup.object({
      controllerSsn4: yup
        .string()
        .default('')
        .when('ein', {
          is: (value: string) => value?.length > 0,
          then: (schema) => schema.matches(/^\d{4}$/).required(),
        }),
      controllerSsn9: yup
        .string()
        .default('')
        .when('ein', {
          is: (value: string) => value?.length === 0,
          then: (schema) => schema.matches(/^\d{9}$/).required(),
        }),
      controllerAddressSameAsBusiness: yup.boolean().default(false),
      controllerAddress: yup
        .string()
        .default('')
        .when('controllerAddressSameAsBusiness', {
          is: false,
          then: (schema) => schema.required(),
        }),
      controllerCity: yup
        .string()
        .default('')
        .when('controllerAddressSameAsBusiness', {
          is: false,
          then: (schema) => schema.required(),
        }),
      controllerState: yup
        .string()
        .default('')
        .when('controllerAddressSameAsBusiness', {
          is: false,
          then: (schema) => schema.required(),
        }),
      controllerZipCode: yup
        .string()
        .default('')
        .when('controllerAddressSameAsBusiness', {
          is: false,
          then: (schema) =>
            schema
              .matches(
                /^\d{5}(?:[-\s]\d{4})?$/,
                'Please enter a valid ZIP Code',
              )
              .required(),
        }),
    }),
  );

type SoleProprietorControllerDetailsStepValues = yup.InferType<
  typeof soleProprietorControllerDetailsSchema
>;

export { controllerDetailsSchema, soleProprietorControllerDetailsSchema };
export type {
  ControllerDetailsStepValues,
  SoleProprietorControllerDetailsStepValues,
};
