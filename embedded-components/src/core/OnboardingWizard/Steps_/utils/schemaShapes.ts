import * as yup from 'yup';

import { createRegExpAndMessage } from '@/lib/utils';

import { organizationType } from '../../utils/models';

const schemaShapes: any = (getContentToken: any) => {
  const isBusiness = (value?: organizationType) => {
    return (
      value === 'Corporation' ||
      value === 'Limited Partnership' ||
      value === 'Limited Liability Company'
    );
  };
  return {
    organizationName: yup
      .string()
      .default('')
      .matches(
        ...createRegExpAndMessage(
          getContentToken?.('validCharacters', undefined, 'common'),
          getContentToken?.(
            'invalidCharactersErrorMessage',
            undefined,
            'common'
          )
        )
      )
      .matches(
        /^(?!\s)(.*[^\s])(?<!\s)$/,
        getContentToken?.(`invalidWhiteSpaces`) ?? ''
      )
      .required(getContentToken?.(`businessName`) ?? ''),
    businessAliasName: yup
      .string()
      .nullable()
      .transform((value, originalValue) =>
        originalValue.trim() === '' ? null : value
      )
      .matches(
        ...createRegExpAndMessage(
          getContentToken?.('validCharacters', undefined, 'common'),
          getContentToken?.(
            'invalidCharactersErrorMessage',
            undefined,
            'common'
          )
        )
      )
      .default('')
      .optional(),
    organizationType: yup
      .mixed<organizationType>()
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
    businessEmail: yup
      .string()
      .email(getContentToken?.(`businessEmail`) ?? '')
      .default('')
      .optional(),
    countryOfFormation: yup
      .mixed()
      .oneOf(['US', 'Canada', 'UK'])
      .default('')
      // TODO: update to token
      .required('Country required'),

    //----
    firstName: yup
      .string()
      .default('')
      .matches(
        ...createRegExpAndMessage(
          getContentToken?.('validCharacters', undefined, 'common'),
          getContentToken?.(
            'invalidCharactersErrorMessage',
            undefined,
            'common'
          )
        )
      )
      .matches(/^\S*\S$/, getContentToken?.(`invalidWhiteSpaces`) ?? '')
      .max(30, getContentToken?.(`maxStringLengthAlert`, [30]) ?? '')
      .required(getContentToken?.(`firstName`) ?? ''),
    lastName: yup
      .string()
      .max(30, getContentToken?.(`maxStringLengthAlert`, [30]) ?? '')
      .matches(
        ...createRegExpAndMessage(
          getContentToken?.('validCharacters', undefined, 'common'),
          getContentToken?.(
            'invalidCharactersErrorMessage',
            undefined,
            'common'
          )
        )
      )
      .matches(/^\S*\S$/, getContentToken?.(`invalidWhiteSpaces`) ?? '')
      .default('')
      .required(getContentToken?.(`lastName`) ?? ''),
    countryOfResidence: yup
      .mixed()
      .oneOf(['US', 'Canada', 'UK'])
      .default('')
      // TODO: update to token
      .required('Country required'),
  };
};

export { schemaShapes };
