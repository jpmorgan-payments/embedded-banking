import * as yup from 'yup';
import { createRegExpAndMessage } from '../../../../lib/utils';

const createAddressFormSchema = (
    getContentToken?: any,
  ) => {
    return yup.object({
      addressLine1: yup
        .string()
        .default('')
        .matches(
          /.*[^\d].*/,
          getContentToken?.('justDigits', undefined, 'common'),
        )
        .matches(
          /^\d.*$/,
          getContentToken?.('numbersStartFirst', undefined, 'common'),
        )
        .matches(
          ...createRegExpAndMessage(
            getContentToken?.('addressValidCharacters', undefined, 'common'),
            getContentToken?.(
              'invalidCharactersErrorMessage',
              undefined,
              'common',
            ),
          ),
        )
        .matches(
          /^(?!\s)(.*[^\s])(?<!\s)$/,
          getContentToken?.(`invalidWhiteSpaces`) ?? '',
        )
        .max(34, getContentToken?.(`maxStringLengthAlert`, [34]) ?? '')
        .required(getContentToken?.(`addressLine1`) ?? ''),
      addressLine2: yup
        .string()
        .nullable()
        .transform((value, originalValue) =>
          originalValue.trim() === '' ? null : value,
        )
        .matches(
          ...createRegExpAndMessage(
            getContentToken?.('addressValidCharacters', undefined, 'common'),
            getContentToken?.(
              'invalidCharactersErrorMessage',
              undefined,
              'common',
            ),
          ),
        )
        .max(34, getContentToken?.(`maxStringLengthAlert`, [34]) ?? '')
        .default(''),
/*       addressLine3: yup
        .string()
        .nullable()
        .transform((value, originalValue) =>
          originalValue.trim() === '' ? null : value,
        )
        .matches(
          ...createRegExpAndMessage(
            getContentToken?.('addressValidCharacters', undefined, 'common'),
            getContentToken?.(
              'invalidCharactersErrorMessage',
              undefined,
              'common',
            ),
          ),
        )
        .when('addressLine2', {
          is: (line2: string) => !line2 || line2.trim() === '',
          then: yup
            .string()
            .nullable()
            .matches(/^$/, getContentToken?.('line2Empty', undefined, 'common')),
        })
        .max(34, getContentToken?.(`maxStringLengthAlert`, [34]) ?? '')
        .default(''), */
      city: yup
        .string()
        .default('')
        .matches(/^[a-zA-Z\s]*$/, getContentToken?.(`validBusinessCity`) ?? '')
        .matches(
          /^(?!\s)(.*[^\s])(?<!\s)$/,
          getContentToken?.(`invalidWhiteSpaces`) ?? '',
        )
        .max(34, getContentToken?.(`maxStringLengthAlert`, [34]) ?? '')
        .required(getContentToken?.(`city`) ?? ''),
      state: yup
        .string()
        .default('')
        .max(30, getContentToken?.(`maxStringLengthAlert`, [30]) ?? '')
        .required(getContentToken?.(`state`) ?? ''),
      zipCode: yup
        .string()
        .default('')
        .max(10, getContentToken?.(`maxStringLengthAlert`, [10]) ?? '')
        .matches(
          /^\d{5}(?:[-\s]\d{4})?$/,
          getContentToken?.(`zipCodeMatch`) ?? '',
        )
        .required(getContentToken?.(`zipReq`) ?? ''),
     
    });
  };
  
  const addressFormSchema = createAddressFormSchema();
  
  type AddressFormValues = yup.InferType<typeof addressFormSchema>;
  
  
  export { createAddressFormSchema, addressFormSchema };
  export type { AddressFormValues };
  