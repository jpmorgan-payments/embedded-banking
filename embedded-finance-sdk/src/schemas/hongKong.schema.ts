import { bicSchema } from "./common/bicSchema";

export const hkSchema = {
  title: "Hong Kong ACH Credit",
  description: "Hong Kong Currency Schema",
  type: "object",
  anyOf: [
    { required: ["initiatingPartyName"] },
    { required: ["initiatingPartyIdentification"] },
  ],
  additionalProperties: true,
  properties: {
    beneficiaryBankBIC: {
      title: "Beneficiary Bank SWIFT/BIC",
      description:
        "Preferred SWIFT format is 11-character code, which includes a branch \
        code. Standard 8-character code will require full branch name and \
        address.",
      ...bicSchema,
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
      description:
        "Hong Kong requires the routing code for the receiving party's bank for cross-border transactions",
      type: "string",
      pattern: "^[0-9]{6}$",
      errorMessage: "Routing code must be 6 digits",
    },
    beneficiaryName: {
      title: "Beneficiary Name",
      type: "string",
      description: "Full name (no initials)",
      minLength: 1,
      maxLength: 140,
    },
    beneficiaryAccountNumber: {
      title: "Beneficiary Account Number",
      description: "Account number is 6 to 9 digits (9 with branch code)",
      type: "string",
      pattern: "^[0-9]{6,9}$",
    },
    originatorName: {
      type: "string",
      title: "Originator Name",
      description: "Full name (no initials)",
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
    "purposeOfPayment",
  ],
  errorMessage: {
    required: "This field is required",
  },
};
