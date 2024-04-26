import * as yup from 'yup';

import { createRegExpAndMessage } from '@/lib/utils';

const createDecisionMakerFormSchema = (getContentToken?: any) => {
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
    jobTitle: yup
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
                  'common'
                )
              )
            )
            .matches(
              /^(?!\s)(.*[^\s])(?<!\s)$/,
              getContentToken?.(`invalidWhiteSpaces`) ?? ''
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
      /* .test(
        'is-valid-us-phone',
        getContentToken?.('isPhoneUSValid'),
        (value) => {
          return (
            !getContentToken?.('isPhoneUSValid') ||
            isValidPhoneNumber(value, 'US') === true
          );
        } 
         )*/
     
      .required(getContentToken?.(`phoneReq`) ?? ''),
    birthDate: yup
      .date()
      .nullable()
      .default(null)
      //.required(getContentToken?.(`controllerBirthDateReq`))
      .test(
        'birthDate',
        getContentToken?.(`birthDateTest`) ?? '',
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
      .required(getContentToken?.(`addressLine1`) ?? ''),
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
        getContentToken?.(`invalidWhiteSpaces`) ?? ''
      )
      .max(34, getContentToken?.(`maxStringLengthAlert`, [34]) ?? '')
      .required(getContentToken?.(`city`) ?? ''),
    state: yup
      .string()
      .default('')
      .max(30, getContentToken?.(`maxStringLengthAlert`, [30]) ?? '')
      .required(getContentToken?.(`state`) ?? ''),
    zip: yup
      .string()
      .default('')
      .max(10, getContentToken?.(`maxStringLengthAlert`, [10]) ?? '')
      .matches(
        /^\d{5}(?:[-\s]\d{4})?$/,
        getContentToken?.(`zipCodeMatch`) ?? ''
      )
      .required(getContentToken?.(`zipReq`) ?? ''),
  });
};

const decisionMakerFormSchema = createDecisionMakerFormSchema();

type DecisionMakerFormValues = yup.InferType<typeof decisionMakerFormSchema>;

export { createDecisionMakerFormSchema, decisionMakerFormSchema };
export type { DecisionMakerFormValues };
