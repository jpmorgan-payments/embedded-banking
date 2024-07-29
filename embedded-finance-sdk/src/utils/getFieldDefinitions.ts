import { FieldDefinition } from "../models/FieldDefinition";
import { CountryKey, PaymentData } from "../schemas";
import { fieldDefinitions } from "../fieldDefinitions";

function getFieldDefinitions<K extends CountryKey>(
  country: K
): FieldDefinition<PaymentData[K]>[] | null {
  const definitions = fieldDefinitions as {
    [key in CountryKey]?: FieldDefinition<PaymentData[key]>[];
  };
  return definitions[country] || null;
}

export { getFieldDefinitions };
