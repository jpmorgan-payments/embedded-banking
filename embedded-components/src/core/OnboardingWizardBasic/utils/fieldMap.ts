import { parsePhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

import { PhoneSmbdo } from '@/api/generated/smbdo.schemas';

import { IndividualStepFormSchema } from '../IndividualStepForm/IndividualStepForm.schema';
import { InitialFormSchema } from '../InitialForm/InitialForm.schema';
import { OrganizationStepFormSchema } from '../OrganizationStepForm/OrganizationStepForm.schema';

// TODO: add more form schemas here
export type OnboardingWizardFormValues = z.infer<typeof InitialFormSchema> &
  z.infer<typeof OrganizationStepFormSchema> &
  z.infer<typeof IndividualStepFormSchema>;

type PartyFieldMap = {
  [K in keyof OnboardingWizardFormValues]:
    | string
    | {
        path: string;
        fromResponseFn: (val: any) => OnboardingWizardFormValues[K];
        toRequestFn: (val: OnboardingWizardFormValues[K]) => any;
      };
};

// Source of truth for mapping form fields to API fields
// Used for handling server errors and creating request bodies
export const partyFieldMap: PartyFieldMap = {
  organizationName: 'organizationDetails.organizationName',
  organizationType: 'organizationDetails.organizationType',
  countryOfFormation: 'organizationDetails.countryOfFormation',
  email: 'email',
  yearOfFormation: 'organizationDetails.yearOfFormation',
  dbaName: 'organizationDetails.dbaName',
  organizationDescription: 'organizationDetails.organizationDescription',
  industryCategory: 'organizationDetails.industryCategory',
  industryType: 'organizationDetails.industryType',
  entitiesInOwnership: {
    path: 'organizationDetails.entitiesInOwnership',
    fromResponseFn: (val: boolean) => (val ? 'yes' : 'no'),
    toRequestFn: (val): boolean => val === 'yes',
  },
  mcc: 'organizationDetails.mcc',
  addresses: 'organizationDetails.addresses',
  associatedCountries: 'organizationDetails.associatedCountries',
  jurisdiction: 'jurisdiction',
  organizationIds: 'organizationDetails.organizationIds',
  organizationPhone: {
    path: 'organizationDetails.phone',
    fromResponseFn: (val: PhoneSmbdo) => ({
      phoneType: val.phoneType,
      phoneNumber: `${val.countryCode}${val.phoneNumber}`,
    }),
    toRequestFn: (val: any): PhoneSmbdo => {
      const phone = parsePhoneNumber(val.phoneNumber);
      return {
        phoneType: val.phoneType,
        countryCode: phone?.countryCallingCode
          ? `+${phone.countryCallingCode}`
          : '',
        phoneNumber: phone?.nationalNumber ?? '',
      };
    },
  },
  tradeOverInternet: {
    path: 'organizationDetails.tradeOverInternet',
    fromResponseFn: (val: boolean) => (val ? 'yes' : 'no'),
    toRequestFn: (val): boolean => val === 'yes',
  },
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
