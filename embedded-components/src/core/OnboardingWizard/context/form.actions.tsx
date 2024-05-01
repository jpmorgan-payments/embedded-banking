import _ from 'lodash';

import { CreateClientRequestSmbdo } from '@/api/generated/embedded-banking.schemas';

import { BusinessDetailsStepValues } from '../Steps/BusinessDetailsStep/BusinessDetailsStep.schema';
import { PersonalDetailsValues } from '../Steps/PersonalDetailsStep/PersonalDetailsStep.schema';
import { OnboardingForm } from './form.context';

export const formToAPIBody = (
  onboardingForm: OnboardingForm
): CreateClientRequestSmbdo => {
  const parties: any[] = [];
  if (
    onboardingForm.businessDetails &&
    onboardingForm.controller &&
    onboardingForm.legalStructure
  ) {
    const businessParty = makeBusiness(
      onboardingForm.businessDetails,
      onboardingForm
    );
    const controllerParty = makeIndividual(
      onboardingForm.controller,
      onboardingForm,
      ['CONTROLLER']
    );
    if (onboardingForm?.otherOwners?.length) {
      for (const owner of onboardingForm.otherOwners) {
        const decisionMakerParty = makeIndividual(owner, onboardingForm, [
          'DECISION_MAKER',
        ]);
        parties.push(decisionMakerParty);
      }
    }
    const form = {
      parties: [...parties, businessParty, controllerParty],
      products: ['EMBEDDED_BANKING'],
    };
    return form;
  }
  throw new Error('Invalid onboarding parameters');
};

/* export const apiToForm = (apiData) => {
  const form = {};
  const apiControllers = apiData?.parties?.filter((party: any) => {
    return party.individualDetails?.roles?.includes("CONTROLLER")
  });
  const otherOwners = apiData?.parties?.filter((party: any) => {
    return !party.individualDetails?.roles?.includes("CONTROLLER")
  });
}
 */

//ADD CONTROLLER TO FORM
export const addOwner = (
  onboardingForm: OnboardingForm,
  owner: PersonalDetailsValues
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
  owner: PersonalDetailsValues
) => {
  return { ...onboardingForm, owner };
};

//ADD CONTROLLER TO FORM
export const addController = (
  onboardingForm: OnboardingForm,
  owner: PersonalDetailsValues
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
  owner: PersonalDetailsValues
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

export const makeIndividual = (
  form: OnboardingForm,
  owner: PersonalDetailsValues,
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
  form: OnboardingForm
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
