import { useState, useCallback } from "react";
import { FieldErrors, validatePayment } from "./utils/validatePayment";
import { getFieldDefinitions } from "./utils/getFieldDefinitions";
import { PaymentData, CountryKey } from "./schemas";
import { Input, FieldDefinition } from "./models";

interface UsePaymentValidationReturnType<K extends CountryKey> {
  validate: (data: Input<PaymentData[K]>) => {
    valid: boolean;
    errors: FieldErrors<PaymentData[K]>;
  };
  validateField: (
    fieldName: keyof PaymentData[K],
    value: any
  ) => { valid: boolean; error: string | null };
  errors: FieldErrors<PaymentData[K]>;
  fieldDefinitions: FieldDefinition<PaymentData[K]>[] | null;
}

/**
 * A React hook for validating payment form data based on the specified country.
 * This hook manages form validation errors and provides utility functions for validating
 * the entire form or individual fields, as well as retrieving field-specific properties
 * such as `required` status and labels
 *
 * @param {Country} country -
 *
 * @returns {UsePaymentValidationReturnType<K>} An object containing:
 *  - `validate`: Function to validate a complete data object.
 *
 * @example
 * const { validate, validateField, errors, getFieldProps } = usePaymentValidation("UK")
 *
 */

function usePaymentValidation<K extends CountryKey>(
  country: K
): UsePaymentValidationReturnType<K> {
  const [errors, setErrors] = useState<FieldErrors<PaymentData[K]>>({});

  // Main validate function
  const validate = useCallback(
    (
      data: Partial<PaymentData[K]>
    ): { valid: boolean; errors: FieldErrors<PaymentData[K]> } => {
      const validation = validatePayment(country, data);
      setErrors(validation.errors);
      return validation;
    },
    [country]
  );

  // Validate single field
  const validateField = useCallback(
    (
      fieldName: keyof PaymentData[K],
      value: any
    ): { valid: boolean; error: string | null } => {
      const validation = validatePayment(country, {
        [fieldName]: value,
      } as PaymentData[K]);

      const hasError = fieldName in validation.errors;

      if (hasError) {
        setErrors((currentErrors) => ({
          ...currentErrors,
          [fieldName]: validation.errors[fieldName],
        }));
      } else {
        setErrors((currentErrors) => ({
          ...currentErrors,
          [fieldName]: undefined,
        }));
      }

      return { valid: !hasError, error: validation.errors[fieldName] ?? null };
    },
    [country]
  );

  // Get field definitions to build forms
  const fieldDefinitions = getFieldDefinitions(country);

  return { validate, validateField, errors, fieldDefinitions };
}

export { usePaymentValidation };
