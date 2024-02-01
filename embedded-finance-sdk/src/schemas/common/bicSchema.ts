export const bicSchema = {
  type: "string",
  pattern: "^(.{8}|.{11})$",
  allOf: [
    {
      if: {
        pattern: "^.{8}$",
      },
      then: {
        pattern: "^[A-Z]{6}[A-Z2-9][A-NP-Z0-9]$",
        errorMessage: "Invalid 8-character code",
      },
    },
    {
      if: {
        pattern: "^.{11}$",
      },
      then: {
        pattern: "^[A-Z]{6}[A-Z2-9][A-NP-Z0-9][A-Z0-9]{3}$",
        errorMessage: "Invalid 11-character code",
      },
    },
  ],
  errorMessage: {
    pattern: "BIC must be 8 or 11 characters",
  },
};
