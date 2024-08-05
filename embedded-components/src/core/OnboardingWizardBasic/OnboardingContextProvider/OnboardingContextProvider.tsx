import { createContext, FC, PropsWithChildren, useContext } from 'react';

type OnboardingContextType = {
  clientId?: string;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export const OnboardingContextProvider: FC<
  PropsWithChildren<OnboardingContextType>
> = ({ children, ...props }) => {
  return (
    <OnboardingContext.Provider value={props}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboardingContext = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error(
      'useOnboardingContext must be used within a OnboardingContextProvider'
    );
  }
  return context;
};
