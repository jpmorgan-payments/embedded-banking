import { createContext, useContext, useMemo, useState } from 'react';

import { BusinessDetailsStepValues } from '../BusinessDetails/BusinessDetails.schema';
import { DecisionMakerFormValues } from '../DecisionMakersForm/DecisionMakerForm.schema';

//import { useListClients } from '../hooks/useListClients';

export type OnboardingForm = {
  legalStructure: string | undefined;
  controller: DecisionMakerFormValues | undefined;
  otherOwners: DecisionMakerFormValues[] | undefined;
  businessDetails: BusinessDetailsStepValues | undefined;
};

export const defaultValues: OnboardingForm = {
  legalStructure: undefined,
  controller: undefined,
  otherOwners: undefined,
  businessDetails: undefined,
};

export const OnboardingFormContext = createContext(defaultValues);

export const useOnboardingForm = () => {
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

  // TODO, put client data here if user already has a client
  //const {data} = useListClients();

  const valueObject = useMemo(() => {
    return { onboardingForm, setOnboardingForm };
  }, [onboardingForm, setOnboardingForm]);

  return (
    <OnboardingFormContext.Provider value={valueObject}>
      {children}
    </OnboardingFormContext.Provider>
  );
};
