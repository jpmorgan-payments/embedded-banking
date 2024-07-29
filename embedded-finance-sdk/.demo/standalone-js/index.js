import {
  validatePayment,
  getFieldDefinitions,
} from "@jpmorgan-payments/embedded-finance-sdk";

const country = "UK"; // Should be determined by your application's context

const data = {
  // ...payment data
};

const { valid, errors } = validatePayment(country, data);

if (valid) {
  // Proceed with API submission or further logic
} else {
  console.log("Validation errors:", errors);
}

// To get field definitions
const fieldDefinitions = getFieldDefinitions(country);
