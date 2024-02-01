export const ibanSchema = {
  type: "string",
  pattern: "^[A-Z]{2}[0-9]{2}[a-zA-Z0-9]{1,30}$",
  errorMessage: "Invalid IBAN format",
};
