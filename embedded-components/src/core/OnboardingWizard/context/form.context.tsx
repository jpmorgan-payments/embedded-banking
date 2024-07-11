import { createContext, useContext, useMemo, useState } from 'react';

import { ClientResponseOutstanding } from '@/api/generated/embedded-banking.schemas';

import { BusinessDetailsStepValues } from '../Steps/BusinessDetailsStep/BusinessDetailsStep.schema';
import { PersonalDetailsValues } from '../Steps/PersonalDetailsStep/PersonalDetailsStep.schema';

//import { useListClients } from '../hooks/useListClients';

export type OnboardingForm = {
  legalStructure: string;
  owner: PersonalDetailsValues | undefined;
  controller: PersonalDetailsValues | undefined;
  otherOwners: PersonalDetailsValues[] | undefined;
  businessDetails: BusinessDetailsStepValues | undefined;
  outstandingItems: ClientResponseOutstanding | undefined;
  id: string | undefined;
  questionsAnswers: any;
  ip: string | undefined;
  attestations: string[] | undefined;
  questionsIds: string[] | undefined;
};

export type defaultVluesFormContext = {
  onboardingForm: OnboardingForm;
  setOnboardingForm: any | null;
};
export const defaultValues: defaultVluesFormContext = {
  onboardingForm: {
    attestations: undefined,
    legalStructure: '',
    owner: undefined,
    controller: undefined,
    otherOwners: undefined,
    businessDetails: undefined,
    outstandingItems: undefined,
    id: undefined,
    questionsAnswers: undefined,
    ip: undefined,
    questionsIds: undefined,
  },
  setOnboardingForm: null,
};

export const OnboardingFormContext: any = createContext(defaultValues);

export const useOnboardingForm = (): {
  onboardingForm: OnboardingForm;
  setOnboardingForm: any;
} => {
  const context: defaultVluesFormContext = useContext(OnboardingFormContext);

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
  const [onboardingForm, setOnboardingForm] = useState(
    defaultValues.onboardingForm
  );

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
