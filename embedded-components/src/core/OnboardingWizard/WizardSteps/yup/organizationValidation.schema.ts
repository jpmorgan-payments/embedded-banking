import { isValidPhoneNumber } from 'libphonenumber-js';
import * as yup from 'yup';

import { createRegExpAndMessage } from '@/lib/utils';

import { organizationType } from '../../utils/models';

export const organizationValidation: any = (getContentToken: any) => {
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
    dbaName: yup
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
    ein: yup
      .string()
      .default('')
      .matches(/^\d{9}$/, getContentToken?.(`ein`) ?? '')
      .required(getContentToken?.(`einReq`) ?? ''),
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
    yearOfFormation: yup
      .number()
      .default(undefined)
      .typeError(getContentToken?.(`yearOfFormationReq`) ?? '')
      .required(getContentToken?.(`yearOfFormationReq`) ?? '')
      .min(1900, getContentToken?.(`yearOfFormationMin`) ?? '')
      .max(
        new Date().getFullYear(),
        getContentToken?.(`yearOfFormationMax`) ?? ''
      ),
    websiteAvailable: yup.boolean().default(false),
    website: yup
      .string()
      .default('')
      .when('websiteAvailable', {
        is: true,
        then: (schema) =>
          schema
            .url()
            .required(getContentToken?.(`websiteReq`) ?? '')
            .test('https', getContentToken?.(`websiteTest`) ?? '', (value) => {
              /*
                 - http(s)? - protocol validation
                 - www - we require www subdomain
                 - [a-zA-Z0-9@:%._+~#=]{2,256} - domain name format validation, https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/DomainNameFormat.html
                 - [a-z]{2,63} - top level domain https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_domain_name
                 - ([a-zA-Z0-9-@:%_+.~#?&/=\\]*) - query validation (e.g. '/test')
                */
              return /^http(s)?:\/\/www\.[a-zA-Z0-9-@!"#$%&'()*+,/:;<=>?[\]_`{|}~.]{1,256}\.[a-z]{2,63}\b([a-zA-Z0-9-@!"#$%&'()*+,/:;<=>?[\]_`{|}~.\\]*)$/.test(
                value
              );
            }),
      }),

    organizationDescription: yup
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
      .test(
        'noWhiteSpace',
        getContentToken?.(`invalidWhiteSpaces`) ?? '',
        (value) => !/^\s+|\s+$/.test(value)
      )
      .test(
        'noNewline',
        getContentToken?.(`invalidNewLine`) ?? '',
        (value) => !value.includes('\n')
      )
      .required(getContentToken?.(`businessDescriptionReq`) ?? ''),

    businessAddressType: yup
      .mixed()
      .oneOf(
        [
          'LEGAL_ADDRESS',
          'MAILING_ADDRESS',
          'BUSINESS_ADDRESS',
          'RESIDENTIAL_ADDRESS',
        ],
        'Address Type required'
      )
      .default('')
      .required('Address Type required'),
    businessAddressLine1: yup
      .string()
      .default('')

      .max(34, getContentToken?.(`maxStringLengthAlert`, [34]) ?? '')
      .when('businessAddressSameAsController', {
        is: false,
        then: (schema) =>
          schema
            .matches(
              ...createRegExpAndMessage(
                getContentToken?.(
                  'addressValidCharacters',
                  undefined,
                  'common'
                ),
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
            .required(getContentToken?.(`businessAddressLine1Req`) ?? '')
            .matches(
              /.*[^\d].*/,
              getContentToken?.('justDigits', undefined, 'common')
            )
            .matches(
              /^\d.*$/,
              getContentToken?.('numbersStartFirst', undefined, 'common')
            ),
      }),
    businessAddressLine2: yup
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
    businessAddressLine3: yup
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
      .when('businessAddressLine2', {
        is: (line2: string) => !line2 || line2.trim() === '',
        then: (schema) =>
          schema
            .nullable()
            .matches(
              /^$/,
              getContentToken?.('line2Empty', undefined, 'common')
            ),
      })
      .max(34, getContentToken?.(`maxStringLengthAlert`, [34]) ?? ''),
    businessCity: yup
      .string()
      .default('')
      .when('businessAddressSameAsController', {
        is: false,
        then: (schema) =>
          schema
            .max(34, getContentToken?.(`maxStringLengthAlert`, [34]) ?? '')
            .matches(
              /^[a-zA-Z\s]*$/,
              getContentToken?.(`validBusinessCity`) ?? ''
            )
            .matches(
              /^(?!\s)(.*[^\s])(?<!\s)$/,
              getContentToken?.(`invalidWhiteSpaces`) ?? ''
            )
            .required(getContentToken?.(`businessCity`) ?? ''),
      }),
    businessState: yup
      .string()
      .default('')
      .when('businessAddressSameAsController', {
        is: false,
        then: (schema) =>
          schema
            .max(30, getContentToken?.(`maxStringLengthAlert`, [30]) ?? '')
            .required(getContentToken?.(`businessState`) ?? ''),
      }),
    businessPostalCode: yup
      .string()
      .default('')
      .when('businessAddressSameAsController', {
        is: false,
        then: (schema) =>
          schema
            .max(10, getContentToken?.(`maxStringLengthAlert`, [10]) ?? '')
            .matches(
              /^\d{5}(?:[-\s]\d{4})?$/,
              getContentToken?.(`businessZipCodeMatch`) ?? ''
            )
            .required(getContentToken?.(`businessZipCodeReq`) ?? ''),
      }),
    businessCountry: yup
      .mixed()
      .oneOf(['US', 'Canada', 'UK'], 'Country required')
      .default('')
      .required('Country required'),
    businessPhoneType: yup
      .mixed()
      .oneOf(
        ['BUSINESS_PHONE', 'MOBILE_PHONE', 'ALTERNATE_PHONE'],
        'Phone Type required'
      )
      .default('')
      .required('Phone Type required'),
    businessPhone: yup
      .string()
      .default('')
      .matches(/^\d{10}$/, getContentToken?.(`businessPhoneMatch`) ?? '')
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
      .required(getContentToken?.(`businessPhoneReq`) ?? ''),
    industryType: yup
      .string()
      .nullable()
      .default('')
      .required(getContentToken?.(`industryType`) ?? ''),
    industryCategory: yup
      .string()
      .nullable()
      .default('')
      .required(getContentToken?.(`industryCategory`) ?? ''),
  };
};
