import {
  ClientProductList,
  CreateClientRequestSmbdo,
  CreatePartyRequestInlineRequired,
  UpdateClientRequestSmbdo,
} from '@/api/generated/smbdo.schemas';

import { OnboardingForm } from '../context/form.context';

// import { any } from '../Steps/BusinessDetailsStep/BusinessDetailsStep.schema';
// import { any } from '../Steps/PersonalDetailsStep/PersonalDetailsStep.schema';

export const makeBusiness = (business: any, form: OnboardingForm) => {
  const addressLines = [];

  if (business?.businessAddressLine1) {
    addressLines.push(business?.businessAddressLine1);
  }

  if (business?.businessAddressLine2) {
    addressLines.push(business?.businessAddressLine2);
  }
  //TODO: 3rd line business needs to be added back
  if (business?.businessAddressLine3)
    addressLines.push(business?.businessAddressLine3);

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
      organizationDescription: business?.organizationDescription,
      industryCategory: business?.industryCategory,
      industryType: business?.industryType,
      yearOfFormation: business?.yearOfFormation,
      countryOfFormation: 'US',
      // significantOwnership:
      //   form?.questionsAnswers?.significantOwnership === 'no',
      entitiesInOwnership:
        form?.questionsAnswers?.entitiesInOwnership === 'yes',
      addresses: [
        {
          addressType: business?.addressType,
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
      websiteAvailable: !business?.websiteAvailable,
      ...(business?.website ? { website: business?.website } : {}),
    },
  };

  return party;
};

export const makeIndividual = (
  owner: any,
  form: OnboardingForm,
  roles: string[]
) => {
  const addressLines = [];
  if (owner?.addressLine1) addressLines.push(owner?.addressLine1);
  if (owner?.addressLine2) addressLines.push(owner?.addressLine2);
  if (owner?.addressLine3) addressLines.push(owner?.addressLine3);

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
      parties: [
        ...parties,
        businessParty,
        controllerParty,
      ] as CreatePartyRequestInlineRequired[],
      products: ['EMBEDDED_PAYMENTS'] as ClientProductList,
    };

    return form;
  }

  throw new Error('Invalid onboarding parameters');
};

export const makeQuestionsAPIBody = (
  questionRes: any,
  questionList?: string[]
): UpdateClientRequestSmbdo => {
  const responses: any = [];
  for (const [key, value] of Object.entries(questionRes)) {
    if (!questionList) {
      if (value) {
        responses.push({
          questionId: key,
          values: [value],
        });
      }
    }

    if (questionList?.includes(key) && value) {
      if (value) {
        responses.push({
          questionId: key,
          values: [value],
        });
      }
    }
  }
  return { questionResponses: responses };
};
