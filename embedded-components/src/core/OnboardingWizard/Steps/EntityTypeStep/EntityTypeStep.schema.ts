import * as yup from 'yup';

import { LegalStructure } from '../../utils/models';

const createEntityTypeFormValidationSchema = (getContentToken?: any) => {
  const isBusiness = (value?: LegalStructure) => {
    return (
      value === 'Corporation' ||
      value === 'Limited Partnership' ||
      value === 'Limited Liability Company'
    );
  };
  return yup.object({
    legalStructure: yup
      .mixed<LegalStructure>()
      .oneOf(
        [
          'Corporation',
          'Limited Partnership',
          'Limited Liability Company',
          'Sole Proprietorship',
        ],
        getContentToken?.(`schemaLegal`) ?? ''
      )
      .default('')
      .required(),
    // businessInSanctionedCountries: yup
    //   .string()
    //   .oneOf(['yes', 'no'], getContentToken?.(`schemaAnswerQuestion`) ?? '')
    //   .default('no')
    //   .required(),
    // relatedToATM: yup
    //   .string()
    //   .oneOf(['yes', 'no'], getContentToken?.(`schemaAnswerQuestion`) ?? '')
    //   .default('no')
    //   .required(),
    // entitiesInOwnership: yup.string().when('legalStructure', {
    //   is: isBusiness,
    //   then: (schema) =>
    //     schema
    //       .oneOf(['yes', 'no'], getContentToken?.(`schemaAnswerQuestion`) ?? '')
    //       .default('no')
    //       .required(),
    // }),

    // significantOwnership: yup.string().when('legalStructure', {
    //   is: isBusiness,
    //   then: (schema) =>
    //     schema
    //       .oneOf(['yes', 'no'], getContentToken?.(`schemaAnswerQuestion`) ?? '')
    //       .default('no')
    //       .required(),
    // }),
    // mockEnabled: yup.boolean().default(false),
  });
};
const entityTypeFormValidationSchema = createEntityTypeFormValidationSchema();

type tEntityTypeFormValidationSchemaValues = yup.InferType<
  typeof entityTypeFormValidationSchema
>;

export { createEntityTypeFormValidationSchema, entityTypeFormValidationSchema };
export type { tEntityTypeFormValidationSchemaValues };
