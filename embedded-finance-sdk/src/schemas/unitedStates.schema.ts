const us = {
  title: "US ACH IAT Credit",
  description: "",
  type: "object",
  anyOf: [
    { required: ["initiatingPartyName"] },
    { required: ["initiatingPartyIdentification"] },
  ],
  properties: {
    initiatingPartyName: {
      type: "string",
      minLength: 1,
      maxLength: 140,
    },
    paymentMethod: {
      oneOf: ["CHK", "TRF", "TRA"],
    },
    purposeOfPayment: {
      type: "string",
    },
  },
};
