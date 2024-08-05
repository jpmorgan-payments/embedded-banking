import { UseFormReturn } from 'react-hook-form';

import {
  ApiErrorReasonV2,
  ClientResponse,
  CreateClientRequestSmbdo,
  UpdateClientRequestSmbdo,
} from '@/api/generated/embedded-banking.schemas';

import { fieldMap, OnboardingWizardFormValues } from './fieldMap';

type FormError = {
  field?: keyof typeof fieldMap;
  message: string;
  path?: string;
};

export function translateApiErrorsToFormErrors(
  errors: ApiErrorReasonV2[],
  partyIndex: number
): FormError[] {
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

export function setApiFormErrors(
  form: UseFormReturn<any>,
  apiFormErrors: FormError[]
) {
  apiFormErrors.forEach((formError) => {
    if (formError.field === undefined) {
      form.setError('root.unhandled', {
        message: `${
          form.formState.errors.root?.unhandled?.message ?? ''
        }\n${formError.path}: ${formError.message}`,
      });
    } else {
      form.setError(formError.field, {
        message: `Server Error: ${formError.message}`,
      });
    }
  });
}

function setValueByPath(obj: any, path: string, value: any) {
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

// Modify the request body with the form values at the specified partyIndex
export function generateRequestBody(
  formValues: Partial<OnboardingWizardFormValues>,
  partyIndex: number,
  obj: Partial<CreateClientRequestSmbdo> | Partial<UpdateClientRequestSmbdo>
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

    setValueByPath(obj, path, value);
  });

  return obj;
}

export function getValueByPath(
  obj: any,
  pathTemplate: string,
  index: number
): any {
  const path = pathTemplate.replace('{index}', index.toString());
  const keys = path.replace(/\[(\w+)\]/g, '.$1').split('.');
  return keys.reduce(
    (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
    obj
  );
}

// Convert data of party (with the specified partyId) to form values
export function convertClientResponseToFormValues(
  response: ClientResponse,
  partyId?: string
): Partial<OnboardingWizardFormValues> {
  const formValues: Record<string, any> = {};

  Object.entries(fieldMap).forEach(([fieldName, path]) => {
    const partyIndex =
      response.parties?.findIndex((party) => party.id === partyId) ?? -1;
    const value = getValueByPath(response, path, partyIndex);
    if (value !== undefined) {
      formValues[fieldName] = value;
    } else {
      console.log(fieldName, value);
    }
  });

  return formValues;
}
