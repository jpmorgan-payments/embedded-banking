import { createContext, useContext } from 'react';

export interface onRegistrationProp {
  clientId: string;
}
export interface RootConfig {
  clientId?: string;
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
  return (
    <RootConfigContext.Provider value={clientOptions}>
      {children}
    </RootConfigContext.Provider>
  );
};
