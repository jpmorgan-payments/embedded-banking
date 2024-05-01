import _ from 'lodash';

import { BusinessDetailsStepValues } from '../BusinessDetailsStep/BusinessDetailsStep.schema';
import { DecisionMakerFormValues } from '../DecisionMakersForm/DecisionMakerForm.schema';
import { OnboardingForm } from './form.context';

export const formToAPIBody = (onboardingForm: OnboardingForm) => {
  const parties: any[] = [];
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
    parties,
    products: ['EMBEDDED_BANKING'],
  };
  return form;
};

export const apiToForm = (apiData) => {
  const form = {};
  const apiControllers = apiData?.parties?.filter((party: any) => {
    return party.individualDetails?.roles?.includes("CONTROLLER")
  });
  const otherOwners = apiData?.parties?.filter((party: any) => {
    return !party.individualDetails?.roles?.includes("CONTROLLER")
  });
}

export const apiIndividualToOwner = (party) => {
  return {
    
  }
}

//ADD CONTROLLER TO FORM
export const addOwner = (
  onboardingForm: OnboardingForm,
  owner: DecisionMakerFormValues
) => {
  //TODO: pass role type?
  /*
  "CLIENT" "PRIMARY_ACCOUNT_OWNER" "BENEFICIAL_OWNER" "CONTROLLER" "DECISION_MAKER" "PRIMARY_CONTACT" "AUTHORIZED_USER" "AUTHORIZED_USER_ADMIN" "AUTHORIZED_USER_OPS" "DIRECTOR"
  */

  return { ...onboardingForm, owner };
};

//ADD BUSINESS DETAILS
export const addBusinessOwner = (
  onboardingForm: OnboardingForm,
  owner: DecisionMakerFormValues
) => {
  return { ...onboardingForm, owner };
};

//ADD CONTROLLER TO FORM
export const addController = (
  onboardingForm: OnboardingForm,
  owner: DecisionMakerFormValues
) => {
  //TODO: pass role type?
  /*
  "CLIENT" "PRIMARY_ACCOUNT_OWNER" "BENEFICIAL_OWNER" "CONTROLLER" "DECISION_MAKER" "PRIMARY_CONTACT" "AUTHORIZED_USER" "AUTHORIZED_USER_ADMIN" "AUTHORIZED_USER_OPS" "DIRECTOR"
  */
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

//ADD BUSINESS DETAILS
export const addBusinessDetails = (
  onboardingForm: OnboardingForm,
  businessDetails: BusinessDetailsStepValues
) => {
  return { ...onboardingForm, businessDetails };
};

//ADD BUSINESS TYPE
export const addBusinessType = (
  onboardingForm: OnboardingForm,
  businessType: string
) => {
  const form = _.cloneDeep(onboardingForm);
  form.legalStructure = businessType;
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
