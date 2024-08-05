import { z } from 'zod';

import { InitialFormSchema } from '../InitialStepForm/InitialStepForm.schema';
import { OrganizationStepFormSchema } from '../OrganizationStepForm/OrganizationStepForm.schema';

// TODO: add more form schemas here
export type OnboardingWizardFormValues = z.infer<typeof InitialFormSchema> &
  z.infer<typeof OrganizationStepFormSchema>;
export type OnboardingWizardFormFieldNames = keyof OnboardingWizardFormValues;

// Source of truth for mapping form fields to API fields
// Used for handling server errors and creating request bodies
export const fieldMap: Record<OnboardingWizardFormFieldNames, string> = {
  organizationName: 'parties[{index}].organizationDetails.organizationName',
  organizationType: 'parties[{index}].organizationDetails.organizationType',
  countryOfFormation: 'parties[{index}].organizationDetails.countryOfFormation',
  email: 'parties[{index}].email',
  yearOfFormation: 'parties[{index}].organizationDetails.yearOfFormation',
};
