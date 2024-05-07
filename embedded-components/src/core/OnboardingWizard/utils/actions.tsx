import _ from 'lodash';

import {
  ClientResponseOutstanding,
  CreateClientRequestSmbdo,
  UpdateClientRequestSmbdo,
} from '@/api/generated/embedded-banking.schemas';

import { BusinessDetailsStepValues } from '../Steps/BusinessDetailsStep/BusinessDetailsStep.schema';
import { PersonalDetailsValues } from '../Steps/PersonalDetailsStep/PersonalDetailsStep.schema';
import { OnboardingForm } from '../context/form.context';

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

export const addOutstandingItemsAndId = (
  onboardingForm: OnboardingForm,
  outstandingItems: ClientResponseOutstanding,
  id: string
) => {
  return { ...onboardingForm, outstandingItems, id };
};

export const updateOutstandingItems = (
  onboardingForm: OnboardingForm,
  outstandingItems: ClientResponseOutstanding
) => {
  const form = _.cloneDeep(onboardingForm);
  form.outstandingItems = outstandingItems;
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

//ADD OTHER OWNERS
export const updateOtherOwner = (
  onboardingForm: OnboardingForm,
  owner: PersonalDetailsValues,
  index: number
) => {
  const form = _.cloneDeep(onboardingForm);
  const newOtherOwners = form?.otherOwners;
  if (newOtherOwners != null) {
    newOtherOwners[index] = owner;
    form.otherOwners = newOtherOwners;
    return form;
  }

  throw new Error('invalid onboarding form structure');
};

//REMOVE OTHER OWNERS
export const removeOtherOwner = (
  onboardingForm: OnboardingForm,
  owner: PersonalDetailsValues
) => {
  const form = JSON.parse(JSON.stringify(onboardingForm));
  let newOtherOwners = form?.otherOwners;
  if (newOtherOwners !== null) {
    newOtherOwners = newOtherOwners.filter((x: PersonalDetailsValues) => {
      return x.firstName!==owner?.firstName
    })
    form.otherOwners = newOtherOwners;
    return form;
  }
  throw new Error('invalid onboarding form structure');
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
  owner: PersonalDetailsValues,
  form: OnboardingForm,
  roles: string[]
) => {
  const addressLines = [];
  if (owner?.addressLine1) addressLines.push(owner?.addressLine1);
  if (owner?.addressLine2) addressLines.push(owner?.addressLine2);
  // if (owner?.addressLine3) addressLines.push(owner?.addressLine3);
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
          addressLines,
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

export const makeQuestionsAPIBody = (
  questionRes: any
): UpdateClientRequestSmbdo => {
  const responses: any = [];
  for (const [key, value] of Object.entries(questionRes)) {
    responses.push({
      questionId: key,
      values: [value],
    });
  }
  return { questionResponses: responses };
};

export const makeBusiness = (
  business: BusinessDetailsStepValues,
  form: OnboardingForm
) => {
  const addressLines = [];
  if (business?.businessAddressLine1)
    addressLines.push(business?.businessAddressLine1);
  if (business?.businessAddressLine2)
    addressLines.push(business?.businessAddressLine2);
  // if (business?.businessAddressLine3)
  //   addressLines.push(business?.businessAddressLine3);

  const organizationSwitch = (businessType: string | undefined) => {
    const map: any = {
      Corporation: 'C_CORPORATION',
      'Limited Partnership': 'LIMITED_PARTNERSHIP',
      'Limited Liability Company': 'LIMITED_LIABILITY_COMPANY',
      'Sole Proprietorship': 'SOLE_PROPRIETORSHIP',
    };
    return businessType ? map[businessType] : '';
  };

  const party = {
    partyType: 'ORGANIZATION',
    email: business?.businessEmail,
    roles: ['CLIENT'],
    organizationDetails: {
      organizationType: organizationSwitch(form?.legalStructure),
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
          addressLines,
          city: business?.businessCity,
          state: business?.businessState,
          postalCode: business?.businessZipCode,
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
