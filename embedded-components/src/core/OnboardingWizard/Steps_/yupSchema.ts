import * as yup from 'yup';

import { createRegExpAndMessage } from '@/lib/utils';

const yupSchema: any = {
  Init: (getContentToken: any) => {
    console.log(
      '@@INIT LOADED>>',
      getContentToken?.(`businessName`) ?? '',
      '::WTF',
      getContentToken?.('invalidCharactersErrorMessage', undefined, 'common'),
      '<>',
      getContentToken?.(`invalidWhiteSpaces`) ?? ''
    );

    return yup.object().shape({
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
    });
  },
  Business: (getContentToken: any) => {
    return yup.object({
      businessEmail: yup
        .string()
        .email(getContentToken?.(`businessEmail`) ?? '')
        .default('')
        .optional(),
    });
  },

  Individual: (getContentToken: any) => {
    return yup.object({
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
    });
  },
};

export { yupSchema };
