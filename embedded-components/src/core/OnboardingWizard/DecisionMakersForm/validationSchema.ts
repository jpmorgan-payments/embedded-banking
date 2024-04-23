import * as yup from 'yup';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { createRegExpAndMessage } from '../../../lib/utils';

const createDecisionMakerFormSchema = (
    legalStructure?: any,
    getContentToken?: any,
  ) => {
    return yup.object({
      id: yup.string().default(''),
      firstName: yup
        .string()
        .default('')
        .matches(
          ...createRegExpAndMessage(
            getContentToken?.('validCharacters', undefined, 'common'),
            getContentToken?.(
              'invalidCharactersErrorMessage',
              undefined,
              'common',
            ),
          ),
        )
        .matches(/^\S*\S$/, getContentToken?.(`invalidWhiteSpaces`) ?? '')
        .max(30, getContentToken?.(`maxStringLengthAlert`, [30]) ?? '')
        .required(getContentToken?.(`firstName`) ?? ''),
      middleName: yup
        .string()
        .nullable()
        .transform((value, originalValue) =>
          originalValue.trim() === '' ? null : value,
        )
        .matches(
          ...createRegExpAndMessage(
            getContentToken?.('validCharacters', undefined, 'common'),
            getContentToken?.(
              'invalidCharactersErrorMessage',
              undefined,
              'common',
            ),
          ),
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
              'common',
            ),
          ),
        )
        .matches(/^\S*\S$/, getContentToken?.(`invalidWhiteSpaces`) ?? '')
        .default('')
        .required(getContentToken?.(`lastName`) ?? ''),
      jobTitle:
        legalStructure === 'Sole Proprietorship'
          ? yup.string().default('').optional()
          : yup
              .string()
              .default('')
              .required(getContentToken?.(`jobTitle`) ?? ''),
      jobTitleDescription: yup
        .string()
        .default('')
        .max(50, getContentToken?.(`maxStringLengthAlert`, [50]) ?? '')
        .when('jobTitle', {
          is: 'Other',
          then: (schema) =>
            schema
              .matches(
                ...createRegExpAndMessage(
                  getContentToken?.('validCharacters', undefined, 'common'),
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
              .required(getContentToken?.(`jobTitleDescription`) ?? ''),
        }),
      email: yup
        .string()
        .email()
        .default('')
        .max(50, getContentToken?.(`maxStringLengthAlert`, [50]) ?? '')
        .required(getContentToken?.(`email`) ?? ''),
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
      phone: yup
        .string()
        .default('')
        .matches(/^\d{10}$/, getContentToken?.(`phoneMatch`) ?? '')
        .test(
          'is-valid-us-phone',
          getContentToken?.('isPhoneUSValid'),
          (value) => {
            return (
              !getContentToken?.('isPhoneUSValid') ||
              isValidPhoneNumber(value, 'US') === true
            );
          },
        )
        .required(getContentToken?.(`phoneReq`) ?? ''),
      birthDate: yup
        .date()
        .nullable()
        .default(null)
        .test(
          'birthday',
          getContentToken?.(`birthDateTest`) ?? '',
          function (value) {
            if (value !== null) {
              const ageDiffMs = Date.now() - value.valueOf();
              const ageDate = new Date(ageDiffMs);
              const ageYears = Math.abs(ageDate.getUTCFullYear() - 1970);
              return ageYears >= 18;
            }
            return true;
          },
        ),
    });
  };
  
  const decisionMakerFormSchema = createDecisionMakerFormSchema();
  
  type DecisionMakerFormValues = yup.InferType<typeof decisionMakerFormSchema>;
  
  const decisionMakersStepSchema = (getContentToken?: (val: string) => string) =>
    yup.object({
      decisionMakersExist: yup
        .string()
        .oneOf(['yes', 'no'])
        .required(getContentToken?.(`decisionMakersExist`) ?? ''),
      decisionMakers: yup
        .array()
        .of(yup.mixed<DecisionMakerFormValues>().defined())
        .defined()
        .default([]),
      decisionMakersValid: yup
        .boolean()
        .default(true)
        .test(
          'valid',
          getContentToken?.(`decisionMakersValid`) ?? '',
          (value) => value,
        ),
    });
  const valdecisionMakersStepSchema = decisionMakersStepSchema();
  type DecisionMakersStepValues = yup.InferType<
    typeof valdecisionMakersStepSchema
  >;
  
  export { createDecisionMakerFormSchema, decisionMakersStepSchema };
  export type { DecisionMakerFormValues, DecisionMakersStepValues };
  