import { z } from 'zod';

import { IndividualStepFormSchema } from '../IndividualStepForm/IndividualStepForm.schema';
import { InitialFormSchema } from '../InitialForm/InitialForm.schema';
import { OrganizationStepFormSchema } from '../OrganizationStepForm/OrganizationStepForm.schema';

// TODO: add more form schemas here
export type OnboardingWizardFormValues = z.infer<typeof InitialFormSchema> &
  z.infer<typeof OrganizationStepFormSchema> &
  z.infer<typeof IndividualStepFormSchema>;
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
  mcc: 'organizationDetails.mcc',
  addresses: 'organizationDetails.addresses',
  associatedCountries: 'organizationDetails.associatedCountries',
  jurisdiction: 'jurisdiction',
  organizationIds: 'organizationDetails.organizationIds',
  phone: 'organizationDetails.phone',
  tradeOverInternet: 'organizationDetails.tradeOverInternet',
  website: 'organizationDetails.website',
  websiteAvailable: 'organizationDetails.websiteAvailable',
  secondaryMccList: 'organizationDetails.secondaryMccList',
  birthDate: 'individualDetails.birthDate',
  countryOfResidence: 'individualDetails.countryOfResidence',
  firstName: 'individualDetails.firstName',
  middleName: 'individualDetails.middleName',
  lastName: 'individualDetails.lastName',
  nameSuffix: 'individualDetails.nameSuffix',
  individualIds: 'individualDetails.individualIds',
  jobTitle: 'individualDetails.jobTitle',
  jobTitleDescription: 'individualDetails.jobTitleDescription',
  natureOfOwnership: 'individualDetails.natureOfOwnership',
  soleOwner: 'individualDetails.soleOwner',
  individualAddresses: 'individualDetails.addresses',
  individualPhone: 'individualDetails.phone',
};
