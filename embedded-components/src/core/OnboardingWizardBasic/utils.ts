import { z } from 'zod';

import {
  ApiErrorReasonV2,
  CreateClientRequestSmbdo,
  UpdateClientRequestSmbdoAddPartiesItem,
} from '@/api/generated/embedded-banking.schemas';

import { InitialFormSchema } from './InitialStepForm/InitialStepForm.schema';

// TODO: add more form schemas here
type OnboardingWizardFormValues = z.infer<typeof InitialFormSchema>;
type OnboardingWizardFormFieldNames = keyof OnboardingWizardFormValues;

// Source of truth for mapping form fields to API fields
// Used for handling server errors and creating request bodies
const fieldMap: Record<OnboardingWizardFormFieldNames, string> = {
  organizationName: 'parties[{index}].organizationDetails.organizationName',
  organizationType: 'parties[{index}].organizationDetails.organizationType',
  countryOfFormation: 'parties[{index}].organizationDetails.countryOfFormation',
  email: 'parties[{index}].email',
};

export function translateApiErrorsToFormErrors(
  errors: ApiErrorReasonV2[],
  partyIndex: number
) {
  const fieldMapKeys = Object.keys(fieldMap) as Array<keyof typeof fieldMap>;
  return errors.map((error) => {
    const matchedKey = fieldMapKeys.find(
      (key) =>
        fieldMap[key].replace(/\{index\}/g, partyIndex.toString()) ===
        (error.field ?? '')
    );
    if (!matchedKey && error.field && error.field in fieldMap) {
      return {
        field: error.field as keyof typeof fieldMap,
        message: error.message,
        path: error.field,
      };
    }
    return { field: matchedKey, message: error.message, path: error.field };
  });
}

function setValue(obj: any, path: string, value: any) {
  const keys = path.replace(/\[(\w+)\]/g, '.$1').split('.');
  keys.reduce((acc, key, index) => {
    if (index === keys.length - 1) {
      acc[key] = value;
    } else {
      acc[key] = acc[key] || (key.match(/^\d+$/) ? [] : {});
    }
    return acc[key];
  }, obj);
}

export function generateRequestBody(
  formValues: Partial<OnboardingWizardFormValues>,
  obj:
    | Partial<CreateClientRequestSmbdo>
    | Partial<UpdateClientRequestSmbdoAddPartiesItem>,
  partyIndex: number
) {
  const formValueKeys = Object.keys(formValues) as Array<
    keyof OnboardingWizardFormValues
  >;
  formValueKeys.forEach((key) => {
    if (!fieldMap[key]) {
      throw new Error(`${key} is not mapped in fieldMap`);
    }
    const path = fieldMap[key].replace(/\{index\}/g, partyIndex.toString());
    const value = formValues[key];

    setValue(obj, path, value);
  });

  return obj;
}
