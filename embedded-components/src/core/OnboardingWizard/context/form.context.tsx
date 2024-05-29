import { createContext, useContext, useMemo, useState } from 'react';

import { ClientResponseOutstanding } from '@/api/generated/embedded-banking.schemas';

import { BusinessDetailsStepValues } from '../Steps/BusinessDetailsStep/BusinessDetailsStep.schema';
import { PersonalDetailsValues } from '../Steps/PersonalDetailsStep/PersonalDetailsStep.schema';

//import { useListClients } from '../hooks/useListClients';

export type OnboardingForm = {
  legalStructure: string | undefined;
  owner: PersonalDetailsValues | undefined;
  controller: PersonalDetailsValues | undefined;
  otherOwners: PersonalDetailsValues[] | undefined;
  businessDetails: BusinessDetailsStepValues | undefined;
  outstandingItems: ClientResponseOutstanding | undefined;
  id: string | undefined;
  questionsAnswers: any;
};

export const defaultValues: OnboardingForm = {
  legalStructure: undefined,
  owner: undefined,
  controller: undefined,
  otherOwners: undefined,
  businessDetails: undefined,
  outstandingItems: undefined,
  id: undefined,
  questionsAnswers: undefined,
};

export const OnboardingFormContext: any = createContext(defaultValues);

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
