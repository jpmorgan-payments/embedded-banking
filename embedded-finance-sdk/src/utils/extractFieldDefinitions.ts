import { FieldDefinition, FieldType } from "../models/FieldDefinition";

function extractFieldDefinitions<T>(schema: any): FieldDefinition<T>[] {
  const definitions: FieldDefinition<T>[] = [];

  const properties = schema.properties || {};
  const requiredFields = new Set(schema.required || []);

  (Object.keys(properties) as Array<keyof T>).forEach((key) => {
    const field = properties[key];
    let fieldType: FieldType | "" = "text";

    // Determine the input type based on schema properties
    switch (field.type) {
      case "string":
        // prettier-ignore
        fieldType =
          field.format === "date-time" ? "datetime-local"
            : field.format === "email" ? "email" 
            : field.enum ? "select" 
            : "text";
        break;
      case "integer":
      case "number":
        fieldType = "number";
        break;
    }

    const definition: FieldDefinition<T> = {
      name: key,
      label: field.title || "",
      description: field.description || "",
      type: fieldType,
      required: requiredFields.has(key as string),
      examples: field.examples || [],
      options: field.enum || [],
    };

    definitions.push(definition);
  });

  return definitions;
}

export { extractFieldDefinitions };
