import _ from 'lodash';

import { ClientResponseOutstanding } from '@/api/generated/embedded-banking.schemas';

import { OnboardingForm } from '../context/form.context';
import { BusinessDetailsStepValues } from '../Steps/BusinessDetailsStep/BusinessDetailsStep.schema';
import { PersonalDetailsValues } from '../Steps/PersonalDetailsStep/PersonalDetailsStep.schema';

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
      return x.firstName !== owner?.firstName;
    });
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
  return {
    ...onboardingForm,
    businessDetails: { ...onboardingForm.businessDetails, ...businessDetails },
  };
};
export const addQuestionAnswers = (
  onboardingForm: OnboardingForm,
  questions: any
) => {
  return {
    ...onboardingForm,
    questionsAnswers: { ...onboardingForm.questionsAnswers, ...questions },
  };
};

//ADD BUSINESS TYPE
export const addBusinessType = (
  onboardingForm: OnboardingForm,
  businessType: string
) => {
  const form = { ...onboardingForm, legalStructure: businessType };
  // form.legalStructure = businessType;
  return form;
};

// AD IP
export const addIp = (onboardingForm: OnboardingForm, ip: string) => {
  const form = { ...onboardingForm, ip };
  // form.legalStructure = businessType;
  return form;
};
