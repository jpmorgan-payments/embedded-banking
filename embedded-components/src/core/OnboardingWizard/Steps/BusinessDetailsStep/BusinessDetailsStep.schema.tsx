import { isValidPhoneNumber } from 'libphonenumber-js';
import * as yup from 'yup';

// import { GetContentTokenType } from '../../../../../contexts/ContentProvider/useContentData';
import { createRegExpAndMessage } from '@/lib/utils';


const businessDetailsSchema = (getContentToken?: any) => {
  return yup.object({
    // legalStructure: yup
    //   .mixed<LegalStructure>()
    //   .oneOf([
    //     'Corporation',
    //     'Limited Partnership',
    //     'Limited Liability Company',
    //     'Sole Proprietorship',
    //   ])
    //   .default(''),
    significantOwnership: yup.boolean(),
    businessName: yup
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
    businessEmail: yup
      .string()
      .email(getContentToken?.(`businessEmail`) ?? '')
      .default('')
      .optional(),
    ein: yup
      .string()
      .default('')
      .matches(/^\d{9}$/, getContentToken?.(`ein`) ?? '')
      .required(getContentToken?.(`einReq`) ?? ''),
    // yearOfFormation: yup
    //   .number()
    //   .default(undefined)
    //   .typeError(getContentToken?.(`yearOfFormationReq`) ?? '')
    //   .required(getContentToken?.(`yearOfFormationReq`) ?? '')
    //   .min(1900, getContentToken?.(`yearOfFormationMin`) ?? '')
    //   .max(
    //     new Date().getFullYear(),
    //     getContentToken?.(`yearOfFormationMax`) ?? ''
    //   ),
    // website: yup
    //   .string()
    //   .default('')
    //   .when('websiteNotAvailable', {
    //     is: false,
    //     then: (schema) =>
    //       schema
    //         .url()
    //         .required(getContentToken?.(`websiteReq`) ?? '')
    //         .test(
    //           'https',
    //           getContentToken?.(`websiteTest`) ?? '',
    //           function (value) {
    //             /*
    //              - http(s)? - protocol validation
    //              - www - we require www subdomain
    //              - [a-zA-Z0-9@:%._+~#=]{2,256} - domain name format validation, https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/DomainNameFormat.html
    //              - [a-z]{2,63} - top level domain https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_domain_name
    //              - ([a-zA-Z0-9-@:%_+.~#?&/=\\]*) - query validation (e.g. '/test')
    //             */
    //             return /^http(s)?:\/\/www\.[a-zA-Z0-9-@!"#$%&'()*+,/:;<=>?[\]_`{|}~.]{1,256}\.[a-z]{2,63}\b([a-zA-Z0-9-@!"#$%&'()*+,/:;<=>?[\]_`{|}~.\\]*)$/.test(
    //               value
    //             );
    //           }
    //         ),
    //   }),
    websiteNotAvailable: yup.boolean().default(false),
    businessDescription: yup
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
    businessAddressSameAsController: yup.boolean().default(false),
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
    // businessAddressLine3: yup
    //   .string()
    //   .nullable()
    //   .transform((value, originalValue) =>
    //     originalValue.trim() === '' ? null : value
    //   )
    //   .matches(
    //     ...createRegExpAndMessage(
    //       getContentToken?.('addressValidCharacters', undefined, 'common'),
    //       getContentToken?.(
    //         'invalidCharactersErrorMessage',
    //         undefined,
    //         'common'
    //       )
    //     )
    //   )
    //   .default('')
    //   .when('businessAddressLine2', {
    //     is: (line2: string) => !line2 || line2.trim() === '',
    //     then: yup
    //       .string()
    //       .nullable()
    //       .matches(/^$/, getContentToken?.('line2Empty', undefined, 'common')),
    //   })
    //   .max(34, getContentToken?.(`maxStringLengthAlert`, [34]) ?? ''),
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
    businessZipCode: yup
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
  });
};
const valBusinessDetailsSchema = businessDetailsSchema();
type BusinessDetailsStepValues = yup.InferType<typeof valBusinessDetailsSchema>;

const soleProprietorBusinessDetailsSchema = (
  getContentToken?: (
    val: string,
    wordList?: Array<string | number | undefined>
  ) => string
) => {
  return businessDetailsSchema(getContentToken)
    .omit(['businessName', 'ein'])
    .concat(
      yup.object({
        businessName: yup.string().default('').optional(),
        businessIdentification: yup
          .string()
          .oneOf(
            ['ein', 'ssn'],
            getContentToken?.(`businessIdentification`) ?? ''
          )
          .required(),
        ein: yup
          .string()
          .default('')
          .when('businessIdentification', {
            is: 'ein',
            then: (schema) =>
              schema
                .matches(/^\d{9}$/, {
                  message: getContentToken?.(`ein`) ?? '',
                  excludeEmptyString: true,
                })
                .required(getContentToken?.(`einReq`) ?? ''),
          }),
        controllerSsn9: yup
          .string()
          .default('')
          .when('businessIdentification', {
            is: 'ssn',
            then: (schema) =>
              schema
                .matches(/^\d{9}$/, getContentToken?.(`controllerSsn9`) ?? '')
                .required(getContentToken?.(`controllerSsn9Req`) ?? ''),
          }),
      })
    );
};

const valSoleProprietorBusinessDetailsSchema =
  soleProprietorBusinessDetailsSchema();
type SoleProprietorBusinessDetailsStepValues = yup.InferType<
  typeof valSoleProprietorBusinessDetailsSchema
>;

export { businessDetailsSchema, soleProprietorBusinessDetailsSchema };
export type {
  BusinessDetailsStepValues,
  SoleProprietorBusinessDetailsStepValues,
};
