import { createContext, useContext, useMemo, useState } from 'react';

export type onRegistrationProp = {
  clientId: string;
};
export interface RootConfig {
  clientId: string | undefined;
  onRegistration: ({ clientId }: onRegistrationProp) => void;
}

export const defaultRootConfig = {
  clientId: undefined,
  onRegistration: undefined,
};

export const RootConfigContext: any = createContext(defaultRootConfig);

export const useRootConfig = (): RootConfig => {
  const context: RootConfig = useContext(RootConfigContext);
  if (context === undefined) {
    throw new Error('useRootConfig must be used within RootConfigProvider');
  }
  return context;
};

export const RootConfigProvider: React.FC<{
  children: React.ReactNode;
  clientOptions: RootConfig;
}> = ({ children, clientOptions }) => {
  console.log('@@clientOptions', clientOptions);

  //   const [onboardingForm, setOnboardingForm] = useState(
  //     defaultValues.onboardingForm
  //   );

  // TODO, put client data here if user already has a client
  //const {data} = useListClients();

  //   const valueObject = useMemo(() => {
  //     return { onboardingForm, setOnboardingForm };
  //   }, [onboardingForm, setOnboardingForm]);

  return (
    <RootConfigContext.Provider value={clientOptions}>
      {children}
    </RootConfigContext.Provider>
  );
};
