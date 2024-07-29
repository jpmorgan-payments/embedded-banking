import {
  IndividualDetails,
  OrganizationDetails,
} from '@/api/generated/embedded-banking.schemas';

// import { any } from '../Steps/BusinessDetailsStep/BusinessDetailsStep.schema';
// import { any } from '../Steps/PersonalDetailsStep/PersonalDetailsStep.schema';
import { fromDateToString } from '../WizardSteps/utils/fromDateToString';
import { transformDobToApi } from './transformDobtoApi';

export const fromFormToOrgParty = (form: any) => {
  let orgParty: OrganizationDetails = {};

  const addressLines = [
    form?.businessAddressLine1,
    form?.businessAddressLine2,
    // TODO: correct 3rd line
    // form?.businessAddressLine3,
  ]
    .filter((val) => val)
    .join(' ');

  // const organizationSwitch = (businessType: string | undefined) => {
  //   const map: any = {
  //     Corporation: 'C_CORPORATION',
  //     'Limited Partnership': 'LIMITED_PARTNERSHIP',
  //     'Limited Liability Company': 'LIMITED_LIABILITY_COMPANY',
  //     'Sole Proprietorship': 'SOLE_PROPRIETORSHIP',
  //   };
  //   return businessType ? map[businessType] : '';
  // };

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
        postalCode: form.businessPostalCode,
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
// any
export const fromFormToIndParty = (form: any) => {
  let indParty: IndividualDetails = {};
  console.log('@@form', form.birthDate);

  const addressLines = [
    form?.addressLine1,
    form?.addressLine2,
    form?.addressLine3,
  ]
    .filter((val) => val)
    .join(' ');

  indParty = {
    firstName: form.firstName,

    lastName: form.lastName,
    birthDate:
      typeof form?.birthDate === 'string'
        ? transformDobToApi(form?.birthDate)
        : fromDateToString(form?.birthDate as Date),
    jobTitle: form?.jobTitle,
    jobTitleDescription: form?.jobTitleDescription,
    addresses: [
      {
        //TODO: Address types have options: EGAL_ADDRESS, MAILING_ADDRESS, BUSINESS_ADDRESS, RESIDENTIAL_ADDRESS
        addressType: 'BUSINESS_ADDRESS',
        addressLines: [addressLines],
        city: form.city,
        state: form.state,
        postalCode: form.postalCode,
        country: 'US',
      },
    ],
    countryOfResidence: 'US',
    phone: {
      //TODO: this is one of three options BUSINESS_PHONE, MOBILE_PHONE,ALTERNATE_PHONE
      phoneType: 'MOBILE_PHONE',
      countryCode: '+1',
      phoneNumber: form?.phone,
    },
    // TODO: missing request
    natureOfOwnership: 'Direct',
    //TODO: no desicion maker
    // soleOwner: true,
    individualIds: [
      {
        idType: 'SSN',
        issuer: 'US',
        value: form.ssn,
      },
    ],
  };

  if (form?.middleName) {
    indParty.middleName = form?.middleName as string;
  }

  return indParty;
};
