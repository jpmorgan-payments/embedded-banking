import { isValidPhoneNumber } from 'libphonenumber-js';
import * as yup from 'yup';

import { createRegExpAndMessage } from '@/lib/utils';

import { organizationType } from '../../utils/models';

// TODO: Separate the files into better utils
const schemaShapes: any = (getContentToken: any) => {
  // const isBusiness = (value?: organizationType) => {
  //   return (
  //     value === 'Corporation' ||
  //     value === 'Limited Partnership' ||
  //     value === 'Limited Liability Company'
  //   );
  // };
  return {
    //---- Organization
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
          'SOLE_PROPRIETORSHIP',
          'LIMITED_LIABILITY_COMPANY',
          'S_CORPORATION',
          'C_CORPORATION',
          'UNINCORPORATED_ASSOCIATION',
          'PARTNERSHIP',
          'PUBLICLY_TRADED_COMPANY',
          'NON_PROFIT_CORPORATION',
          'GOVERNMENT_ENTITY',
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

    //---- Individual
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
    middleName: yup
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
      .max(30, getContentToken?.(`maxStringLengthAlert`, [30]) ?? '')
      .default(''),
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
    individualEmail: yup
      .string()
      .email()
      .max(50, getContentToken?.(`maxStringLengthAlert`, [50]) ?? '')
      .default('')
      .required(getContentToken?.(`controllerEmail`) ?? ''),
    jobTitle: yup
      .string()
      .default('')
      .required(getContentToken?.(`controllerJobTitle`) ?? ''),
    jobTitleDescription: yup
      .string()
      .default('')
      .max(50, getContentToken?.(`maxStringLengthAlert`, [50]) ?? '')
      .when('controllerJobTitle', {
        is: 'Other',
        then: (schema) =>
          schema
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
            .required(getContentToken?.(`controllerJobTitleDescription`) ?? ''),
      }),
    ssn: yup
      .string()
      .default('')
      .matches(/^\d{9}$/, getContentToken?.(`controllerSsn9Match`) ?? '')
      .required(getContentToken?.(`controllerSsn9Req`) ?? ''),
    addressLine1: yup
      .string()
      .default('')
      .matches(
        /.*[^\d].*/,
        getContentToken?.('justDigits', undefined, 'common')
      )
      .matches(
        /^\d.*$/,
        getContentToken?.('numbersStartFirst', undefined, 'common')
      )
      .matches(
        ...createRegExpAndMessage(
          getContentToken?.('addressValidCharacters', undefined, 'common'),
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
      .max(34, getContentToken?.(`maxStringLengthAlert`, [34]) ?? '')
      .required(getContentToken?.(`controllerAddressLine1`) ?? ''),
    addressLine2: yup
      .string()
      .nullable()
      .transform((value, originalValue) =>
        originalValue.trim() === '' ? null : value
      )
      .matches(
        ...createRegExpAndMessage(
          getContentToken?.('addressValidCharacters', undefined, 'common'),
          getContentToken?.(
            'invalidCharactersErrorMessage',
            undefined,
            'common'
          )
        )
      )
      .default('')
      .max(34, getContentToken?.(`maxStringLengthAlert`, [34]) ?? ''),
    // controllerAddressLine3: yup
    //   .string()
    //   .nullable()
    //   .transform((value, originalValue) =>
    //     originalValue.trim() === '' ? null : value,
    //   )
    //   .matches(
    //     ...createRegExpAndMessage(
    //       getContentToken?.('addressValidCharacters', undefined, 'common'),
    //       getContentToken?.(
    //         'invalidCharactersErrorMessage',
    //         undefined,
    //         'common',
    //       ),
    //     ),
    //   )
    //   .default('')
    //   .when('controllerAddressLine2', {
    //     is: (line2: string) => !line2 || line2.trim() === '',
    //     then: yup
    //       .string()
    //       .nullable()
    //       .matches(/^$/, getContentToken?.('line2Empty', undefined, 'common')),
    //   })
    //   .max(34, getContentToken?.(`maxStringLengthAlert`, [34]) ?? ''),
    city: yup
      .string()
      .default('')
      .matches(/^[a-zA-Z\s]*$/, getContentToken?.(`validBusinessCity`) ?? '')
      .matches(
        /^(?!\s)(.*[^\s])(?<!\s)$/,
        getContentToken?.(`invalidWhiteSpaces`) ?? ''
      )
      .max(34, getContentToken?.(`maxStringLengthAlert`, [34]) ?? '')
      .required(getContentToken?.(`controllerCity`) ?? ''),
    state: yup
      .string()
      .default('')
      .max(30, getContentToken?.(`maxStringLengthAlert`, [30]) ?? '')
      .required(getContentToken?.(`controllerState`) ?? ''),
    postalCode: yup
      .string()
      .default('')
      .max(10, getContentToken?.(`maxStringLengthAlert`, [10]) ?? '')
      .matches(
        /^\d{5}(?:[-\s]\d{4})?$/,
        getContentToken?.(`controllerZipCodeMatch`) ?? ''
      )
      .required(getContentToken?.(`controllerZipReq`) ?? ''),
    phone: yup
      .string()
      .default('')
      .matches(/^\d{10}$/, getContentToken?.(`controllerPhoneMatch`) ?? '')
      .test(
        'is-valid-us-phone',
        getContentToken?.('isPhoneUSValid'),
        (value) => {
          return (
            !getContentToken?.('isPhoneUSValid') ||
            isValidPhoneNumber(value, 'US') === true
          );
        }
      )
      .required(getContentToken?.(`controllerPhoneReq`) ?? ''),
    birthDate: yup
      .date()
      .nullable()
      .default(null)
      .required(getContentToken?.(`controllerBirthDateReq`) ?? '')
      .test(
        'birthday',
        getContentToken?.(`controllerBirthDateTest`) ?? '',
        (value) => {
          if (value !== null) {
            const ageDiffMs = Date.now() - value.valueOf();
            const ageDate = new Date(ageDiffMs);
            const ageYears = Math.abs(ageDate.getUTCFullYear() - 1970);
            return ageYears >= 18;
          }
          return true;
        }
      ),
    countryOfResidence: yup
      .mixed()
      .oneOf(['US', 'Canada', 'UK'])
      .default('')
      // TODO: update to token
      .required('Country required'),
  };
};

export { schemaShapes };
