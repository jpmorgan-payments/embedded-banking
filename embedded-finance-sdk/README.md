# Embedded Finance SDK

## Overview

Embedded Finance SDK provides a set of tools to validate payment data based on the given country, handle complex conditional logic, and ensure a smooth implementation of UI.

The SDK provides a custom React hook and standalone functions for validations and field definitions, making it easy to create UIs that adhere to the necessary validation rules.

## Features

- **Validate payment data**: Ensure all payment information meets the necessary conditions for the specified country before making a request.
- **Dynamic field requirements**: Based on the selected country, determine which fields are required and their validation rules.
- **Easy-to-use React hook**: Streamline your validation with `usePaymentValidation` which returns validation, error handling, and field definition utilities.
- **Standalone functions**: Use the SDK with other UI frameworks or vanilla JavaScript.

## Usage

[.demo](./.demo) contains simple applications for demo purposes.

### In React Applications

Import and use the `usePaymentForm` hook in your React component:

```tsx
import React from "react";
import { usePaymentValidation } from "@jpmorgan-payments/embedded-finance-sdk";

const PaymentForm = () => {
  const country = "UK" // This should be dynamically set based on user selection

  // Initialize the payment form hook
  const { validate, errors, fieldDefinitions } = usePaymentValidation(country);

  // Event handler for form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.target)
    const validationResult = validate(data);
    if (validationResult.valid) {
      // Proceed with API submission or further logic
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fieldDefinitions.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            required={field.required}
          />
          {errors[field.name] && <span>{errors[field.name]}</span>}
        </div>
      ))}

      {/* Alternatively with a library like Mantine */}
      {fieldDefinitions.map((field) => (
        <TextInput {...field} error={errors[field.name]}>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};
```

### In Non-React Applications

You can use the SDK's standalone functions to perform validations and retrieve field definitions:

```javascript
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
```

## API Reference

### `usePaymentForm(country: string)`

A React hook that provides validation, error handling, and field definition utilities.

- Parameters
  - `country`: The country code (e.g., "UK") used to determine validation rules and field requirements.
- Returns
  - `validate`: A function to validate payment data. Updates `errors` object.
    - Parameters: Payment data object
    - Returns an object with `valid` indicating if the data is valid, and `errors` containing any validation errors.
  - `validateField`: A function to validate a single field. Updates the field in the `errors` object
    - Parameters: Field name, field value
    - Returns a string if error or null if valid
  - `errors`: An object containing validation errors.
  - `fieldDefinitions`: An array of field definitions based on the country.

### `validatePayment(country: string, data: object)`

Validate payment data outside of a React component.

- Parameters
  - `country`: The country code used to determine validation rules and field requirements.
  - `data`: The payment data object to validate
- Returns
  - An object with `valid` indicating if the data is valid, and `errors` containing any validation errors

### `getFieldDefinitions(country: string)`

Retrieve the field definitions for the given country to help dynamically creating form fields.

- Parameters
  - `country`: The country code used to determine which fields are required.
- Returns
  - `An array of field definitions`
