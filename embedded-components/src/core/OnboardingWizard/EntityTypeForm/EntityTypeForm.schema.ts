import * as yup from 'yup';

import { LegalStructure } from '../models';

const validationSchema = (getContentToken?: (val: string) => string) => {
  const isBusiness = (value?: LegalStructure) =>
    value === 'Corporation' ||
    value === 'Limited Partnership' ||
    value === 'Limited Liability Company';

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
    //   .default(undefined)
    //   .required(),
    // significantOwnership: yup.string().when('legalStructure', {
    //   is: isBusiness,
    //   then: (schema) =>
    //     schema
    //       .oneOf(['yes', 'no'], getContentToken?.(`schemaAnswerQuestion`) ?? '')
    //       .default(undefined)
    //       .required(),
    // }),
    // entitiesInOwnership: yup.string().when('legalStructure', {
    //   is: isBusiness,
    //   then: (schema) =>
    //     schema
    //       .oneOf(['yes', 'no'], getContentToken?.(`schemaAnswerQuestion`) ?? '')
    //       .default(undefined)
    //       .required(),
    // }),
    // relatedToATM: yup
    //   .string()
    //   .oneOf(['yes', 'no'], getContentToken?.(`schemaAnswerQuestion`) ?? '')
    //   .default(undefined)
    //   .required(),
    // mockEnabled: yup.boolean().default(false),
  });
};

export { validationSchema };
