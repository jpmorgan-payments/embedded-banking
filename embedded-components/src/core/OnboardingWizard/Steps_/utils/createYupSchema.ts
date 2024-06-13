import * as yup from 'yup';

import { schemaShapes } from './schemaShapes';

const createYupSchema = ({ formSchema, getContentToken }: any) => {
  const shape: any = {};
  formSchema.forEach((fields: any) => {
    if (!fields?.name) {
      throw new Error('Schema is incorrectly formatted');
    }

    shape[fields.name] = schemaShapes(getContentToken)[fields.name];
  });
  return yup.object().shape(shape);
};

export { createYupSchema };
