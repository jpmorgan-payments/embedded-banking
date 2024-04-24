import * as yup from 'yup';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { createRegExpAndMessage } from '../../../../lib/utils';

const createPersonalDetailsFormSchema = (
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
  
  const decisionMakerFormSchema = createPersonalDetailsFormSchema();
  
  type PersonalDetailsFormValues = yup.InferType<typeof decisionMakerFormSchema>;
  
  const decisionMakersStepSchema = (getContentToken?: (val: string) => string) =>
    yup.object({
      decisionMakersExist: yup
        .string()
        .oneOf(['yes', 'no'])
        .required(getContentToken?.(`decisionMakersExist`) ?? ''),
      decisionMakers: yup
        .array()
        .of(yup.mixed<PersonalDetailsFormValues>().defined())
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
  type PersonalDetailssStepValues = yup.InferType<
    typeof valdecisionMakersStepSchema
  >;
  
  export { createPersonalDetailsFormSchema, decisionMakersStepSchema };
  export type { PersonalDetailsFormValues, PersonalDetailssStepValues };
  