import { z } from 'zod';

import { ApiErrorReasonV2 } from '@/api/generated/embedded-banking.schemas';

import { InitialFormSchema } from './InitialStepForm/InitialStepForm.schema';

type OnboardingWizardFormField = keyof z.infer<typeof InitialFormSchema>;

const fieldMap: Record<OnboardingWizardFormField, string> = {
  organizationName: 'parties[{index}].organizationDetails.organizationName',
  organizationType: 'parties[{index}].organizationDetails.organizationType',
};

export function translateApiErrorsToFormErrors(
  errors: ApiErrorReasonV2[],
  partyIndex: number
) {
  return errors.map((error) => {
    const fieldMapKeys = Object.keys(fieldMap) as Array<keyof typeof fieldMap>;
    const matchedKey = fieldMapKeys.find(
      (key) =>
        fieldMap[key].replace(/\{index\}/g, `${partyIndex}`) ===
        (error.field ?? '')
    );
    return { field: matchedKey, message: error.message, path: error.field };
  });
}
