import * as yup from 'yup';

import { fullYupValidationSchema } from '../yup/fullYupValidationSchema';

const createYupSchema = ({ formSchema, getContentToken }: any) => {
  const shape: any = {};
  formSchema.forEach((fields: any) => {
    // if (!fields?.name) {
    //   throw new Error('Schema is incorrectly formatted');
    // }
    if (fields.name) {
      shape[fields.name] =
        fullYupValidationSchema(getContentToken)[fields.name];
    }
  });
  return yup.object().shape(shape);
};

export { createYupSchema };
