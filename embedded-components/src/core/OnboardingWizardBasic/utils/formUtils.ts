import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import {
  ApiErrorReasonV2,
  ClientResponse,
  CreateClientRequestSmbdo,
  UpdateClientRequestSmbdo,
} from '@/api/generated/smbdo.schemas';

import { OnboardingWizardFormValues, partyFieldMap } from './fieldMap';

type FormError = {
  field?: keyof typeof partyFieldMap;
  message: string;
  path?: string;
};

export function translateApiErrorsToFormErrors(
  errors: ApiErrorReasonV2[],
  partyIndex: number,
  arrayName: 'parties' | 'addParties'
): FormError[] {
  const fieldMapKeys = Object.keys(partyFieldMap) as Array<
    keyof typeof partyFieldMap
  >;
  return errors.map((error) => {
    const matchedKey = fieldMapKeys.find(
      (key) =>
        `${arrayName}.${partyIndex}.${partyFieldMap[key]}` === error.field ||
        `${arrayName}[${partyIndex}].${partyFieldMap[key]}` === error.field
    );
    if (!matchedKey && error.field && error.field in partyFieldMap) {
      return {
        field: error.field as keyof typeof partyFieldMap,
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
  let unhandledErrorString = '';
  let focused = false;
  apiFormErrors.forEach((formError) => {
    if (formError.field === undefined) {
      unhandledErrorString += `\n${formError.path}: ${formError.message}`;
    } else {
      form.setError(formError.field, {
        message: `Server Error: ${formError.message}`,
      });
      if (!focused) {
        form.setFocus(formError.field);
        focused = true;
      }
    }
  });
  if (import.meta.env.DEV && unhandledErrorString !== '') {
    toast.error(`[DEV] Unhandled Server Errors`, {
      description: unhandledErrorString,
      duration: Infinity,
      closeButton: true,
    });
  }
}

function setValueByPath(obj: any, path: string, value: any) {
  const keys = path.split('.');
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
  arrayName: 'parties' | 'addParties',
  obj: Partial<CreateClientRequestSmbdo> | Partial<UpdateClientRequestSmbdo>
) {
  const formValueKeys = Object.keys(formValues) as Array<
    keyof OnboardingWizardFormValues
  >;
  formValueKeys.forEach((key) => {
    if (!partyFieldMap[key]) {
      throw new Error(`${key} is not mapped in fieldMap`);
    }
    const path = `${arrayName}.${partyIndex}.${partyFieldMap[key]}`;
    const value = formValues[key];

    if (value !== '') {
      setValueByPath(obj, path, value);
    }
  });

  return obj;
}

export function getValueByPath(obj: any, pathTemplate: string): any {
  const keys = pathTemplate.replace(/\[(\w+)\]/g, '.$1').split('.');
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

  Object.entries(partyFieldMap).forEach(([fieldName, path]) => {
    const partyIndex =
      response.parties?.findIndex((party) => party.id === partyId) ?? -1;

    const pathTemplate = `parties.${partyIndex}.${path}`;
    const value = getValueByPath(response, pathTemplate);
    if (value !== undefined) {
      formValues[fieldName] = value;
    } else {
      console.log(fieldName, value);
    }
  });

  return formValues;
}
