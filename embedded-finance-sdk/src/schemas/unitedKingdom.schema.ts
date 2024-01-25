import { bicSchema } from "./common/bicSchema";
import { ibanSchema } from "./common/ibanSchema";

export const ukSchema = {
  title: "UK ACH Credit (BACS)",
  description: "United Kingdom Currency Schema",
  type: "object",
  additionalProperties: true,
  properties: {
    beneficiaryBankBIC: {
      ...bicSchema,
      title: "Beneficiary Bank SWIFT/BIC",
      description:
        "Preferred SWIFT format is 11-character code, which includes a branch code. Standard 8-character code will require full branch name and address.",
      if: bicSchema,
      then: {
        pattern: "^.{4}GB.*$",
        errorMessage: "The 5th and 6th character must be 'GB'",
      },
      examples: ["BKENGB2LCON", "BKENGB2L"],
    },
    beneficiaryBankName: {
      title: "Beneficiary Bank Name",
      type: "string",
    },
    beneficiaryBankAddress: {
      title: "Beneficiary Bank Address",
      type: "string",
    },
    beneficiaryBankRoutingCode: {
      title: "Beneficiary Bank Routing Code",
      type: "string",
      pattern: "^[0-9]{9}$",
      examples: ["082902139"],
      errorMessage: "Routing code must be 9 digits",
    },
    beneficiaryBankSortCode: {
      title: "Beneficiary Bank Sort Code",
      description:
        "Beneficiary bank branches are identified with a Sort code, which is used to route money transfers between institutions in the UK, and in the Republic of Ireland",
      type: "string",
      pattern: "^//SC[0-9]{6}$",
      examples: ["//SC123456"],
    },
    beneficiaryBankIBAN: {
      ...ibanSchema,
      title: "Beneficiary Bank IBAN",
      description: "Recommended",
      examples: ["GB29NWBK60161331926819"],
    },
    beneficiaryName: {
      type: "string",
      title: "Beneficiary Name",
      description: "Full name (no initials)",
      minLength: 1,
      maxLength: 140,
    },
    beneficiaryAccountNumber: {
      title: "Beneficiary Account Number",
      type: "string",
    },
    originatorName: {
      title: "Originator Name",
      description: "Full name (no initials)",
      type: "string",
      minLength: 1,
      maxLength: 140,
    },
    originatorAddress: {
      title: "Originator Address",
      type: "string",
    },
    originatorAccountNumber: {
      title: "Originator Account Number",
      type: "string",
    },
    paymentMethod: {
      title: "Payment Method",
      type: "string",
      const: "TRF",
      errorMessage: "Must be TRF",
    },
    purposeOfPayment: {
      title: "Purpose of Payment",
      description: "A reason for the cross-border transaction",
      type: "string",
    },
  },
  allOf: [
    {
      if: {
        properties: {
          beneficiaryBankBIC: {
            type: "string",
            pattern: "^.{8}$",
          },
        },
      },
      then: {
        required: ["beneficiaryBankName", "beneficiaryBankAddress"],
        errorMessage: {
          required: {
            beneficiaryBankName:
              "This field is required when providing a 8-character BIC",
            beneficiaryBankAddress:
              "This field is required when providing a 8-character BIC",
          },
        },
      },
    },
  ],
  required: [
    "paymentMethod",
    "beneficiaryBankBIC",
    "beneficiaryBankRoutingCode",
    "beneficiaryName",
    "beneficiaryAccountNumber",
    "originatorName",
    "originatorAddress",
    "originatorAccountNumber",
  ],
  errorMessage: {
    required: "This field is required",
  },
};
