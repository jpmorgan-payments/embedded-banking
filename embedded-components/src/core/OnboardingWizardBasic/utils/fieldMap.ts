import { z } from 'zod';

import { InitialFormSchema } from '../InitialForm/InitialForm.schema';
import { OrganizationStepFormSchema } from '../OrganizationStepForm/OrganizationStepForm.schema';

// TODO: add more form schemas here
export type OnboardingWizardFormValues = z.infer<typeof InitialFormSchema> &
  z.infer<typeof OrganizationStepFormSchema>;
export type OnboardingWizardFormFieldNames = keyof OnboardingWizardFormValues;

// Source of truth for mapping form fields to API fields
// Used for handling server errors and creating request bodies
export const partyFieldMap: Record<OnboardingWizardFormFieldNames, string> = {
  organizationName: 'organizationDetails.organizationName',
  organizationType: 'organizationDetails.organizationType',
  countryOfFormation: 'organizationDetails.countryOfFormation',
  email: 'email',
  yearOfFormation: 'organizationDetails.yearOfFormation',
  dbaName: 'organizationDetails.dbaName',
  organizationDescription: 'organizationDetails.organizationDescription',
  industryCategory: 'organizationDetails.industryCategory',
  industryType: 'organizationDetails.industryType',
  significantOwnership: 'organizationDetails.significantOwnership',
  entitiesInOwnership: 'organizationDetails.entitiesInOwnership',
  websiteAvailable: 'organizationDetails.websiteAvailable',
  mcc: 'organizationDetails.mcc',
  addresses: 'addresses',
  associatedCountries: 'organizationDetails.associatedCountries',
  jurisdiction: 'organizationDetails.jurisdiction',
  organizationIds: 'organizationDetails.organizationIds',
  phone: 'phone',
  tradeOverInternet: 'organizationDetails.tradeOverInternet',
  website: 'organizationDetails.website',
  secondaryMccList: 'organizationDetails.secondaryMccList',
};
