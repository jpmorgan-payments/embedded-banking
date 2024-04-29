import { createContext, useMemo, useState } from 'react';

import { Party } from './api.types';

export const defaultValues = {
  onboardingForm: {
    legalStructure: '',
    owners: [],
    businessDetails: {},
    form: {
      parties: [] as Party[],
      products: ['EMBEDDED_BANKING'] as string[],
    },
  },
  setOnboardingForm: () => {},
};

export const OnboardingFormContext = createContext(defaultValues);

export const OnboardingFormProvider = ({ children }) => {
  const [onboardingForm, setOnboardingForm] = useState();
  const value = useMemo(() => [onboardingForm, setOnboardingForm], [onboardingForm])
  return (
    <OnboardingFormContext.Provider value={value}>
      {children}
    </OnboardingFormContext.Provider>
  );
};
