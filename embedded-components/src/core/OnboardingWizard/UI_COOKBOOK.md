⚠️ DRAFT - UNDER REVIEW ⚠️

This document is a draft and is currently being updated. Information contained herein may be incomplete or subject to change.
Last updated: Jul-31-2024

# Digital Onboarding UI/UX Cookbook

## Introduction

This cookbook provides guidelines for implementing a React-based web application that leverages the Digital Onboarding APIs. We'll focus on creating a stepper wizard layout for the onboarding process, highlighting API operations and UX best practices for each step.

## Setup

1. Set up a new React project (Create React App or Next.js).
2. Install dependencies: `react-query`, `axios`, `formik` (or other form library), `yup` (or other JSON schema validation library), and components library of your choice (Mantine, shadcn, Material-UI, Ant Design, etc.).
3. We recommend to use Orval to generate React Query hooks and TypeScript types from the OpenAPI specification.

## Stepper Wizard Implementation

Create a main component with a wizard / stepper and individual step components. Use React state to manage the active step and client ID.

## Step 1: Intro

### API Operations
- Use the `POST /clients` endpoint to create a new client.

### Hooks
```typescript
const { mutate: createClient } = useCreateClient();
```

### UX Best Practices
- Implement form validation using Yup schema validation.
- Display clear error messages for invalid inputs.
- Use dropdown menus for fields with predefined options (e.g., business type, products) - options will be provided from the respective user guides or reference data APIs.
- Disable the "Next" button until all required fields are filled and valid (client side validation).

## Step 2: Individual and Business Details

### API Operations
- Use `GET /clients/:id` to fetch existing client data.
- Use `POST /clients/:id` to update client information.

### Hooks
```typescript
const { data: clientData, isLoading } = useGetClient(clientId);
const { mutate: updateClient } = useUpdateClient();
```

### UX Best Practices
- Pre-fill form fields with existing data from the API.
- Implement real-time validation as the user types.
- Use appropriate input types (e.g., date picker for birth date).
- Show a loading indicator while fetching client data.

## Steps 3 & 4: Business Owners and Decision Makers

### API Operations
- Use `POST /clients/:id` to update client information with related parties.

### Hooks
```typescript
const { mutate: updateClient } = useUpdateClient();
```

### UX Best Practices
- Allow adding multiple owners/decision makers dynamically.
- Implement a summary view of added parties with edit/delete options.
- Use consistent validation across all party forms.

## Step 5: Due Diligence additional questions

### API Operations
- Use `GET /clients/:id` to fetch outstanding questions.
- Use `GET /questions?questionIds=<comma-separated-question-ids>` to fetch question details.
- Use `POST /clients/:id` to submit question responses.

### Hooks
```typescript
const { data: clientData } = useGetClient(clientId);
const { data: questions } = useGetQuestions({ questionIds: questionIds.join(',') });
const { mutate: updateClient } = useUpdateClient();
```

### UX Best Practices
- Dynamically render questions based on the API response.
- Use appropriate input types based on question format (e.g., radio buttons for boolean questions).
- Implement conditional rendering for follow-up questions.
- Provide clear instructions for each question.

## Step 6: Review and Attestation

### API Operations
- Use `GET /clients/:id` to fetch all client data for review.
- Use `POST /clients/:id` to submit attestations.

### Hooks
```typescript
const { data: clientData } = useGetClient(clientId);
const { mutate: updateClient } = useUpdateClient();
```

### UX Best Practices
- Present a clear summary of all provided information.
- Highlight any missing or incomplete information.
- Allow users to navigate back to previous steps to make changes.
- Clearly explain the attestation process and its implications.
- Use checkboxes for each attestation item.

## Step 7: Trigger Verification

### API Operations
- Use `POST /clients/:id/verifications` to trigger KYC process.
- Use `GET /clients/:id` to fetch updated client status.

### Hooks
```typescript
const { mutate: triggerVerification } = useTriggerVerification();
const { data: clientData } = useGetClient(clientId);
```

### UX Best Practices
- Clearly communicate that this is the final step and no further edits will be possible.
- Show a progress indicator during the verification process.
- Display the current client status and any required additional documents.
- Provide clear instructions for next steps based on the verification outcome.

## General UX Best Practices

1. Implement consistent error handling and display across all steps of the onboarding process.
2. Use loading indicators for all asynchronous operations to provide visual feedback to users.
3. Implement auto-save functionality to prevent data loss. Consider using an optional save data modal in case of browser refreshes or when the tab is closed.
4. Provide a clear and easily accessible way for users to exit the onboarding process while saving their progress.
5. Use clear, concise, and user-friendly language throughout the onboarding process to ensure understanding.
6. Implement responsive design to ensure a smooth experience across various device sizes and types.
7. Provide tooltips or contextual help text for complex fields or concepts to assist users in completing the form accurately.
8. Use progress indicators to show the overall completion status of the onboarding process, helping users understand their position in the journey.
9. Implement analytics to track user progress, identify potential pain points, and continually improve the onboarding experience.
10. Incorporate accessibility (a11y) considerations throughout the onboarding process. This includes:
    - Providing alternative text for images
    - Using descriptive labels for form fields
    - Ensuring the process is fully navigable using keyboard shortcuts
    - Maintaining sufficient color contrast for readability
    - Supporting screen readers with appropriate ARIA attributes
11. Address internationalization (i18n) requirements in the onboarding process:
    - Provide translations for all labels, instructions, and error messages
    - Support multiple languages throughout the onboarding journey
    - Use appropriate date, time, and number formats for different locales
    - Consider cultural differences in design and content presentation
12. Implement field-level validation in real-time to provide immediate feedback to users as they complete the form.
13. Offer a "Save and Continue Later" option to accommodate users who may need to complete the process in multiple sessions.
14. Provide clear next steps or a summary page upon completion of the onboarding process.
15. Use visual cues (such as icons or color-coding) consistently to indicate required fields, errors, or successful validations.

## API Error Handling

- Implement a global error handling mechanism for API calls.
- Display user-friendly error messages based on API error responses.
- Provide guidance on how to resolve common errors.

Example error handling:

```typescript
try {
  await updateClient({ id: clientId, data: formData });
} catch (error) {
  if (error.response && error.response.status === 400) {
    // Handle validation errors
    const validationErrors = error.response.data.reasons;
    // Update form error state with validation errors
  } else {
    // Handle other types of errors
    console.error('An error occurred:', error);
    // Show a generic error message to the user
  }
}
```

By following these guidelines and best practices, you can create a user-friendly and efficient digital onboarding process that leverages the power of the provided APIs while providing a smooth user experience.