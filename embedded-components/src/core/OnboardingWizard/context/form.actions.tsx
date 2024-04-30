import _ from 'lodash';

import { BusinessDetailsStepValues } from '../BusinessDetails/BusinessDetails.schema';
import { DecisionMakerFormValues } from '../DecisionMakersForm/DecisionMakerForm.schema';
import { OnboardingForm } from './form.context';

export const formToAPIBody = (onboardingForm: OnboardingForm) => {
  let parties = [];
  const business = makeBusiness(
    onboardingForm?.businessDetails,
    onboardingForm
  );
  parties.push(business);
  for (let owner of onboardingForm?.owners) {
    const party = makeParty(owner, onboardingForm);
    parties.push(party);
  }
  const form = {
    parties: parties,
    products: ['EMBEDDED_BANKING'],
  };
  return form;
};

//ADD CONTROLLER TO FORM
export const addController = (
  onboardingForm: OnboardingForm,
  owner: DecisionMakerFormValues
) => {
  const form = _.cloneDeep(onboardingForm);
  form.controller = owner;
  return form;
};

//ADD OTHER OWNERS
export const addOtherOwner = (
  onboardingForm: OnboardingForm,
  owner: DecisionMakerFormValues
) => {
  const form = _.cloneDeep(onboardingForm);
  if (form.otherOwners) {
    form.otherOwners = [...form.otherOwners, owner];
  } else {
    form.otherOwners = [owner];
  }
  return form;
};

//REMOVE OTHER OWNERS
export const removeOtherOwner = (
  onboardingForm: OnboardingForm,
  otherOwnerIndex: number
) => {
  const form = _.cloneDeep(onboardingForm);
  if (form.otherOwners) {
    form.otherOwners = _.remove(form.otherOwners, otherOwnerIndex);
  } else {
    throw Error('Invalid use of function removeOtherOwner');
  }
  return form;
};

export const makeParty = (
  form: any,
  owner: DecisionMakerFormValues,
  roles: string[]
) => {
  const party = {
    partyType: 'INDIVIDUAL',
    email: owner?.email,
    roles,
    individualDetails: {
      firstName: owner?.firstName,
      lastName: owner?.lastName,
      jobTitle: owner?.jobTitle,
      jobTitleDescription: owner?.jobTitleDescription,
      soleOwner: form?.legalStructure === 'SOLE_PROPRIETORSHIP',
      countryOfResidence: 'US',
      addresses: [
        {
          addressType: 'RESIDENTIAL_ADDRESS',
          addressLines: _.union(
            owner?.addressLine1,
            owner?.addressLine2,
            owner?.addressLine3
          ),
          city: owner?.city,
          state: owner?.state,
          postalCode: owner?.zip,
          country: 'US',
        },
      ],
    },
  };

  return party;
};

export const makeBusiness = (
  business: BusinessDetailsStepValues,
  form: any
) => {
  const party = {
    partyType: 'ORGANIZATION',
    email: business?.businessEmail,
    roles: ['CLIENT'],
    organizationDetails: {
      organizationType: form?.legalStructure,
      organizationName: business?.businessName,
      organizationDescription: business?.businessDescription,
      industryCategory: business?.industryCategory,
      industryType: business?.industryType,
      yearOfFormation: business?.yearOfFormation,
      countryOfFormation: 'US',
      significantOwnership: business?.significantOwnership,
      addresses: [
        {
          addressType: 'BUSINESS_ADDRESS',
          addressLines: _.union(
            business?.addressLine1,
            business?.addressLine2,
            business?.addressLine3
          ),
          city: business?.city,
          state: business?.state,
          postalCode: business?.zip,
          country: 'US',
        },
      ],
      phone: {
        phoneType: 'BUSINESS_PHONE',
        countryCode: '+1',
        phoneNumber: business.businessPhone,
      },
      organizationIds: business?.ein
        ? [
            {
              idType: 'EIN',
              issuer: 'US',
              value: business?.ein,
            },
          ]
        : [],
      websiteAvailable: !business?.websiteNotAvailable,
      website: business?.website,
    },
  };
  return party;
};
