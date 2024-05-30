import {
  IndividualDetails,
  OrganizationDetails,
} from '@/api/generated/embedded-banking.schemas';

import { BusinessDetailsStepValues } from '../Steps/BusinessDetailsStep/BusinessDetailsStep.schema';
import { PersonalDetailsValues } from '../Steps/PersonalDetailsStep/PersonalDetailsStep.schema';

export const fromFormToOrgParty = (form: BusinessDetailsStepValues) => {
  let orgParty: OrganizationDetails = {};

  const addressLines = [
    form?.businessAddressLine1,
    form?.businessAddressLine2,
    // form?.businessAddressLine3,
  ]
    .filter((val) => val)
    .join(' ');

  const organizationSwitch = (businessType: string | undefined) => {
    const map: any = {
      Corporation: 'C_CORPORATION',
      'Limited Partnership': 'LIMITED_PARTNERSHIP',
      'Limited Liability Company': 'LIMITED_LIABILITY_COMPANY',
      'Sole Proprietorship': 'SOLE_PROPRIETORSHIP',
    };
    return businessType ? map[businessType] : '';
  };

  orgParty = {
    countryOfFormation: 'US',
    // significantOwnership: form?.significantOwnership === 'no',
    // entitiesInOwnership: form?.entitiesInOwnership === 'no',
    organizationName: form?.businessName,
    organizationDescription: form?.businessDescription,
    industryCategory: form?.industryCategory,
    industryType: form?.industryType,
    yearOfFormation: `${form?.yearOfFormation}`,
    addresses: [
      {
        addressType: 'BUSINESS_ADDRESS',
        addressLines: [addressLines],
        city: form.businessCity,
        state: form.businessState,
        postalCode: form.businessZipCode,
        country: 'US',
      },
    ],
    ...(form.businessAliasName ? { dbaName: form.businessAliasName } : {}),
    phone: {
      phoneType: 'BUSINESS_PHONE',
      countryCode: '+1',
      phoneNumber: form?.businessPhone,
    },
    organizationIds: form?.ein
      ? [
          {
            idType: 'EIN',
            issuer: 'US',
            value: form?.ein,
          },
        ]
      : [],
    websiteAvailable: !form?.websiteNotAvailable,
    ...(form?.website ? { website: form?.website } : {}),
  };

  return orgParty;
};
// TODO: update proper types
// PersonalDetailsValues
export const fromFormToIndParty = (form: any) => {
  let indParty: IndividualDetails = {};

  const addressLines = [
    form?.addressLine1,
    form?.addressLine2,
    // form?.addressLine3,
  ]
    .filter((val) => val)
    .join(' ');

  indParty = {
    firstName: form.firstName,
    middleName: form?.middleName,
    lastName: form.lastName,
    birthDate: form?.birthDate,
    jobTitle: form?.jobTitle,
    jobTitleDescription: form?.jobTitleDescription,
    addresses: [
      {
        addressType: 'BUSINESS_ADDRESS',
        addressLines: [addressLines],
        city: form.city,
        state: form.state,
        postalCode: form.zip,
        country: 'US',
      },
    ],
    countryOfResidence: 'US',
    phone: {
      phoneType: 'MOBILE_PHONE',
      countryCode: '+1',
      phoneNumber: form?.phone,
    },
    // TODO: missing request
    natureOfOwnership: 'Direct',
    //TODO: no desicion maker
    soleOwner: true,
  };

  return indParty;
};
