import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { EBComponentsProvider } from '@/core/EBComponentsProvider';

import { onRegistrationProp } from '../EBComponentsProvider/RootConfigProvider';
import { OnboardingWizard } from './OboardingWizard';

const OnboardingWizardWithProvider = ({
  apiBaseUrl,
  headers,
  title,
  theme,
  onRegistration,
  setClientId,
  clientId,
}: {
  apiBaseUrl: string;
  headers: Record<string, string>;
  title: string;
  theme: Record<string, unknown>;
  onRegistration: ({ clientId, clientResponse }: onRegistrationProp) => void;
  setClientId?: (s: string) => void;
  clientId?: string;
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <EBComponentsProvider
          apiBaseUrl={apiBaseUrl}
          headers={headers}
          theme={theme}
        >
          <OnboardingWizard
            title={title}
            onRegistration={onRegistration}
            setClientId={setClientId}
            clientId={clientId}
          />
        </EBComponentsProvider>
      </QueryClientProvider>
    </>
  );
};

const meta: Meta<typeof OnboardingWizardWithProvider> = {
  title: 'Onboarding Wizard with EBComponentsProvider',
  component: OnboardingWizardWithProvider,
};
export default meta;

type Story = StoryObj<typeof OnboardingWizardWithProvider>;

export const Primary: Story = {
  name: 'Basic OnboardingWizard with EBComponentsProvider',
  args: {
    apiBaseUrl: '/api',
    title: 'Onboarding Wizard Simple',
    theme: {
      variables: {
        primaryColor: 'red',
        borderRadius: '15px',
      },
    },
    onRegistration: ({ clientId }: onRegistrationProp) => {
      console.log('@@clientId', clientId);
    },
  },
};

export const NoThemeWithPDPAPIs: Story = {
  name: 'No theme with PDP mocked APIs',
  ...Primary.args,
  args: {
    theme: {},
    apiBaseUrl: 'https://api-mock.payments.jpmorgan.com/tsapi/',
  },
};
