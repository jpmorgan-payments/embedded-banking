import * as yup from 'yup';

import { ResponseSchema } from '@/api/generated/smbdo.schemas';

const createDynamicYupSchema = (
  qSchema: ResponseSchema,
  getContentToken: (token: string) => string,
  format?: string,
  parentId?: string
) => {
  const listSchema = yup
    .array()
    .min(1, getContentToken('listSchemaError') as string);
  const stringSchema = yup
    .string()
    .required(getContentToken('stringSchemaError') as string);
  const integerSchema = yup
    .number()
    .required(getContentToken('stringSchemaError') as string);

  // const booleanSchema = yup
  //   .string()
  //   .oneOf(['yes', 'no'], getContentToken(`schemaAnswerQuestion`) as string);
  const booleanSchema = yup
    .boolean()
    .required(getContentToken(`schemaAnswerQuestion`) as string);
  // .required(getContentToken('stringSchemaError') as string);

  switch (format?.toLowerCase()) {
    case 'list':
      if (parentId) {
        return yup.array().when(parentId, {
          is: true,
          then: (s) => s.concat(listSchema),
        });
      }
      return listSchema;
    case 'boolean':
      if (parentId) {
        return yup.boolean().when(parentId, {
          is: true,
          then: (s: any) => s.concat(booleanSchema),
          // otherwise: (s: any) => yup.boolean().optional(),
        });
      }
      return booleanSchema;
    case 'integer':
      if (parentId) {
        return yup.number().when(parentId, {
          is: true,
          then: (s) => s.concat(integerSchema),
        });
      }
      return integerSchema;
    case 'single':
    case 'string':
    default:
      if (parentId) {
        //   return yup.string().when(parentId, (val, schema) => {
        //     console.log('@@schema, val', val, schema);

        //     return val
        //       ? schema.concat(stringSchema)
        //       : schema.concat(stringSchema);
        //   });

        return yup.string().when(parentId, {
          is: true,
          then: (s) => s.concat(stringSchema),
        });
      }
      if (qSchema.maxItems && qSchema.maxItems > 1 && qSchema.minItems) {
        return yup
          .array()
          .min(qSchema.minItems, getContentToken('listSchemaError') as string)
          .max(
            qSchema.maxItems,
            // TODO: Get correct error message
            `Only select ${qSchema.maxItems} options`
          )
          .required();
      }
      return stringSchema;
  }
};

export { createDynamicYupSchema };
