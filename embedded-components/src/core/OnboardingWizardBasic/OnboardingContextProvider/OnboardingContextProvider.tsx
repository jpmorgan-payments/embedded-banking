import { createContext, FC, PropsWithChildren, useContext } from 'react';

import {
  ApiErrorV2,
  ClientResponse,
  ClientVerificationsInformationResponse,
} from '@/api/generated/embedded-banking.schemas';

type OnboardingContextType = {
  clientId?: string;
  setClientId?: (clientId: string) => void;
  onPostClientResponse?: (
    response?: ClientResponse,
    error?: ApiErrorV2
  ) => void;
  onPostClientVerificationsResponse?: (
    response?: ClientVerificationsInformationResponse,
    error?: ApiErrorV2
  ) => void;
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
