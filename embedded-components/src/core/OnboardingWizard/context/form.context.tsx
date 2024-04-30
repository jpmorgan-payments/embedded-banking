import { createContext, useContext, useMemo, useState } from 'react';

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
  legalStructure: string | undefined;
  owner: DecisionMakerFormValues | undefined;
  controller: DecisionMakerFormValues | undefined;
  otherOwners: DecisionMakerFormValues[] | undefined;
  businessDetails: BusinessDetailsStepValues | undefined;
};

export const defaultValues: OnboardingForm = {
  legalStructure: undefined,
  owner: undefined,
  controller: undefined,
  otherOwners: undefined,
  businessDetails: undefined,
};

export const OnboardingFormContext = createContext(defaultValues);

export const useOnboardingForm = (): any => {
  const context = useContext(OnboardingFormContext);
  if (context === undefined) {
    throw new Error(
      'useOnboardingForm must be used within OnboardingFormProvider'
    );
  }
  return context;
};

export const OnboardingFormProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [onboardingForm, setOnboardingForm] = useState(defaultValues);

  const valueObject = useMemo(() => {
    return { onboardingForm, setOnboardingForm };
  }, [onboardingForm, setOnboardingForm]);

  return (
    <OnboardingFormContext.Provider value={valueObject}>
      {children}
    </OnboardingFormContext.Provider>
  );
};
