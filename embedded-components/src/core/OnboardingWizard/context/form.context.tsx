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
   owners: DecisionMakerFormValues[] | undefined;
   businessDetails: BusinessDetailsStepValues | undefined;
};

// export const defaultValues = {
//   legalStructure: '',
//   owners: undefined,
//   businessDetails: undefined,
// };

//@ts-ignore
export const OnboardingFormContext = createContext();

export const useOnboardingForm = () => {
  const context = useContext(OnboardingFormContext)
  if (context === undefined) {
     throw new Error('useValue must be used within a ValueProvider')       }
   return context
 }

export const OnboardingFormProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [onboardingForm, setOnboardingForm] = useState(null);

  const valueObject = useMemo(() => {
    return { onboardingForm, setOnboardingForm };
  }, [onboardingForm, setOnboardingForm]);
  return (
    <OnboardingFormContext.Provider value={valueObject}>
      {children}
    </OnboardingFormContext.Provider>
  );
};
