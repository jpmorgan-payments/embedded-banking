import * as yup from 'yup';

export const reviewStepSchema = yup.object({
  attested: yup
    .boolean()
    .default(false)
    .isTrue('You must certify that the information is complete and correct.'),
});

export type ReviewStepValues = yup.InferType<typeof reviewStepSchema>;