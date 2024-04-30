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
  controller: DecisionMakerFormValues | undefined;
  otherOwners: DecisionMakerFormValues[] | undefined;
  businessDetails: BusinessDetailsStepValues | undefined;
};

export const defaultValues = {
  legalStructure: undefined,
  controller: undefined,
  otherOwners: undefined,
  businessDetails: undefined,
};

//@ts-ignore
export const OnboardingFormContext = createContext();

export const useOnboardingForm = () => {
  const context = useContext(OnboardingFormContext);
  if (context === undefined) {
    throw new Error('useOnboardingForm must be used within OnboardingFormProvider');
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
