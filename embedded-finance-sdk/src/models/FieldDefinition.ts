export type FieldType =
  | "text"
  | "email"
  | "number"
  | "select"
  | "datetime-local";

export type FieldDefinition<T = any> = {
  name: keyof T;
  type: FieldType;
  label: string;
  description: string;
  // placeholder?: string;
  required: boolean;
  options: string[];
  examples: string[];
};
