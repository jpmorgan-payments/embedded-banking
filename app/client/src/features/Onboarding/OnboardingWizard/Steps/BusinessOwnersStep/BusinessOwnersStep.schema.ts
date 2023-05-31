import * as yup from 'yup';
import type { BusinessOwnerFormValues } from './BusinessOwnerForm/BusinessOwnerForm.schema';

export const businessOwnersStepSchema = yup.object({
  ownersExist: yup
    .string()
    .oneOf(['yes', 'no'])
    .required('Please specify if there are any owners of your business.'),
  controllerIsOwner: yup
    .string()
    .oneOf(['yes', 'no'])
    .when('ownersExist', {
      is: 'yes',
      then: (schema) =>
        schema.required(
          'Please specify if the controller is a business owner.',
        ),
    }),
  owners: yup
    .array()
    .of(yup.mixed<BusinessOwnerFormValues>().defined())
    .defined(),
});

export type BusinessOwnersStepValues = yup.InferType<
  typeof businessOwnersStepSchema
>;
