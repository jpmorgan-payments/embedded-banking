import type { Meta, StoryObj } from '@storybook/react';

import { EBComponentsProvider } from '@/core/EBComponentsProvider';

import { onRegistrationProp } from '../EBComponentsProvider/RootConfigProvider';
import { OnboardingWizard } from './OnboardingWizard';

const OnboardingWizardWithProvider = ({
  apiBaseUrl,
  headers,
  title,
  theme,
  onGetClientsConfirmation,
  onPostClientsVerification,
  setClientId,
  clientId,
}: {
  apiBaseUrl: string;
  headers: Record<string, string>;
  title: string;
  theme: Record<string, unknown>;
  onGetClientsConfirmation: ({
    clientId,
    clientResponse,
  }: {
    clientId: string;
    clientResponse?: any;
  }) => void;
  onPostClientsVerification: ({
    clientId,
    clientResponse,
  }: {
    clientId: string;
    clientResponse?: any;
  }) => void;

  setClientId?: (s: string) => void;
  clientId?: string;
}) => {
  return (
    <>
      <EBComponentsProvider
        apiBaseUrl={apiBaseUrl}
        headers={headers}
        theme={theme}
      >
        <OnboardingWizard
          title={title}
          onGetClientsConfirmation={onGetClientsConfirmation}
          onPostClientsVerification={onPostClientsVerification}
          setClientId={setClientId}
          clientId={clientId}
        />
      </EBComponentsProvider>
    </>
  );
};

const meta: Meta<typeof OnboardingWizardWithProvider> = {
  title: 'Onboarding Wizard / Environment',
  component: OnboardingWizardWithProvider,
};
export default meta;

type Story = StoryObj<typeof OnboardingWizardWithProvider>;

export const Primary: Story = {
  name: 'UAT',
  args: {
    apiBaseUrl: '/paste-uat-url-here',
    headers: {
      api_gateway_client_id: 'EBCLIENT22',
    },
    clientId: '',
    title: 'Onboarding Wizard Simple',
    theme: {
      variables: {
        primaryColor: '#7CB9E8',
        borderRadius: '15px',
      },
    },
    onGetClientsConfirmation: ({ clientId }: onRegistrationProp) => {
      console.log('@@clientId', clientId);
    },
    onPostClientsVerification: ({ clientId }: onRegistrationProp) => {
      console.log('@@clientId', clientId);
    },
  },
  parameters: {},
};

export const Dev: Story = {
  name: 'DEV',
  args: {
    apiBaseUrl: '/paste-dev-url-here',
    headers: {
      api_gateway_client_id: 'OBTSTSTCL1',
    },
    clientId: '',
    title: 'Onboarding Wizard Simple',
    theme: {
      variables: {
        primaryColor: '#7CB9E8',
        borderRadius: '15px',
      },
    },
    onGetClientsConfirmation: ({ clientId }: onRegistrationProp) => {
      console.log('@@clientId', clientId);
    },
    onPostClientsVerification: ({ clientId }: onRegistrationProp) => {
      console.log('@@clientId', clientId);
    },
  },
  parameters: {},
};
