import * as yup from 'yup';

export const verificationsStepSchema = (
  getContentToken?: (val: string) => string
) =>
  yup.object({
    reviewedTerms: yup
      .boolean()
      .default(false)
      .oneOf([true], getContentToken?.(`reviewedTerms`) ?? ''),
    reviewedDisclosure: yup
      .boolean()
      .default(false)
      .oneOf([true], getContentToken?.(`reviewedDisclosure`) ?? ''),
    attestedDataCorrect: yup
      .boolean()
      .default(false)
      .test(
        'isTrue',
        getContentToken?.(`attestedDataCorrect`) ?? '',
        (value) => value
      ),
    attestedAuthorized: yup
      .boolean()
      .default(false)
      .test(
        'isTrue',
        getContentToken?.(`attestedAuthorized`) ?? '',
        (value) => value
      ),
    attestedReadDocuments: yup
      .boolean()
      .default(false)
      .when('reviewedTerms', {
        is: false,
        then: (schema) =>
          schema.isTrue(getContentToken?.(`attestedReadDocuments`) ?? ''),
      })
      .when('reviewedDisclosure', {
        is: false,
        then: (schema) =>
          schema.isTrue(getContentToken?.(`attestedReadDocumentsTerms`) ?? ''),
      })
      .test(
        'isTrue',
        getContentToken?.(`attestedReadDocumentsDisc`) ?? '',
        (value) => value
      ),
  });

const valverificationsStepSchema = verificationsStepSchema();
export type VerificationsStepValues = yup.InferType<
  typeof valverificationsStepSchema
>;
