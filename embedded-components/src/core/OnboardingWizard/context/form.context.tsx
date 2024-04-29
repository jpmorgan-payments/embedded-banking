import { createContext, useMemo, useState } from 'react';
import { BusinessDetailsStepValues } from '../BusinessDetails/BusinessDetails.schema';
import { DecisionMakerFormValues } from '../DecisionMakersForm/DecisionMakerForm.schema';

//FORM SUBMITTED WILL HAVE THE FOLLOWING STRUCTURE
/**
 form: {
  parties: [] as Party[],
  products: ['EMBEDDED_BANKING'] as string[],
},
**/

export type OnboardingForm = {
  legalStructure: string | null;
  owners: DecisionMakerFormValues[] | null;
  businessDetails: BusinessDetailsStepValues | null;
};

export type OnboardingFormContext = {
  onboardingForm: OnboardingForm;
  setOnboardingForm: (form: OnboardingForm) => void;
};

export const defaultValues = {
  onboardingForm: {
    legalStructure: null,
    owners: null,
    businessDetails: null,
  },
  setOnboardingForm: (form: any) => { console.log(form)},
};

export const OnboardingFormContext = createContext(defaultValues);

export const OnboardingFormProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {

  const [onboardingForm, setOnboardingForm] =
    useState<OnboardingFormContext>(defaultValues);

  /**const value = useMemo(
    () => [onboardingForm, setOnboardingForm],
    [onboardingForm]
  ); */
  return (
    <OnboardingFormContext.Provider value={[onboardingForm, setOnboardingForm]}>
      {children}
    </OnboardingFormContext.Provider>
  );
};
