import React, {
  createContext,
  useState,
} from 'react';

import { Party } from './api.types';


export const defaultValues = {
  onboardingForm: {
    legalStructure: '',
    form: {
      parties: [] as Party[],
      products: ['EMBEDDED_BANKING'] as string[],
    },
  },
};

export const OnboardingFormContext = createContext(defaultValues);

export const OnboardingFormProvider = ({ children }) => {
  const [onboardingForm, setOnboardingForm] = useState();


  return (
    <OnboardingFormContext.Provider value={[onboardingForm, setOnboardingForm]}>
      {children}
    </OnboardingFormContext.Provider>
  );
};
