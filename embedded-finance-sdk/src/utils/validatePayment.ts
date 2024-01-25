import Ajv, { ErrorObject } from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import { CountryKey, PaymentData, schemas } from "../schemas";
import { Input, FieldErrors, FieldSpecificErrors } from "../models";

const ajv = addErrors(
  addFormats(new Ajv({ allErrors: true }), [
    "date-time",
    "time",
    "date",
    "email",
    "hostname",
    "ipv4",
    "ipv6",
    "uri",
    "uri-reference",
    "uuid",
    "uri-template",
    "json-pointer",
    "relative-json-pointer",
    "regex",
  ])
);

function mapErrorsToFields<T>(
  errors: ErrorObject[] | null | undefined
): FieldErrors<T> {
  const fieldSpecificErrors: FieldSpecificErrors<T> = {};
  let globalError: string | undefined;

  errors?.forEach((error) => {
    if (error.instancePath.startsWith("/") && error.keyword !== "if") {
      const fieldName = error.instancePath.substring(1) as keyof T;
      fieldSpecificErrors[fieldName] = error.message || "E";
    } else if (
      error.keyword === "required" &&
      error.params &&
      error.params.missingProperty
    ) {
      const fieldName = error.params.missingProperty as keyof T;
      fieldSpecificErrors[fieldName] = error.message ?? "";
    } else if (
      error.keyword === "errorMessage" &&
      error.params &&
      error.params.errors
    ) {
      error.params.errors.forEach((nestedError: ErrorObject) => {
        if (
          nestedError.keyword === "required" &&
          nestedError.params &&
          nestedError.params.missingProperty
        ) {
          const fieldName = nestedError.params.missingProperty as keyof T;
          fieldSpecificErrors[fieldName] = error.message;
        } else if (
          nestedError.instancePath.startsWith("/") &&
          nestedError.keyword !== "if"
        ) {
          const fieldName = nestedError.instancePath.substring(1) as keyof T;
          fieldSpecificErrors[fieldName] = error.message;
        }
      });
    }
  });

  const combinedErrors: FieldErrors<T> = { ...fieldSpecificErrors };
  if (globalError) {
    combinedErrors._global = globalError;
  }

  return combinedErrors;
}

function validatePayment<K extends CountryKey>(
  country: K,
  data: Input<PaymentData[K]>
): { valid: boolean; errors: FieldErrors<PaymentData[K]> } {
  const schema = schemas[country];
  if (!schema) {
    return {
      valid: false,
      errors: { _global: `Invalid country: ${country}` },
    };
  }

  // Remove empty strings
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== "")
  );

  const validate = ajv.compile(schema);
  const valid = validate(filteredData);

  if (!valid) {
    return {
      valid: valid,
      errors: mapErrorsToFields<PaymentData[K]>(validate.errors),
    };
  }

  return { valid: valid, errors: {} };
}

export { validatePayment, FieldErrors };
