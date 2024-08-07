import type { Meta, StoryObj } from '@storybook/react';

import {
  ApiErrorV2,
  ClientResponse,
  ClientVerificationsInformationResponse,
} from '@/api/generated/embedded-banking.schemas';
import { EBComponentsProvider } from '@/core/EBComponentsProvider';

import { OnboardingWizardBasic } from './OnboardingWizardBasic';

const OnboardingWizardBasicWithProvider = ({
  apiBaseUrl,
  headers,
  title,
  theme,
  onPostClientResponse,
  onPostClientVerificationsResponse,
  setClientId,
  clientId,
}: {
  apiBaseUrl: string;
  headers: Record<string, string>;
  title: string;
  theme: Record<string, unknown>;
  onPostClientResponse: (response?: ClientResponse, error?: ApiErrorV2) => void;
  onPostClientVerificationsResponse?: (
    response?: ClientVerificationsInformationResponse,
    error?: ApiErrorV2
  ) => void;
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
        <OnboardingWizardBasic
          title={title}
          onPostClientResponse={onPostClientResponse}
          onPostClientVerificationsResponse={onPostClientVerificationsResponse}
          setClientId={setClientId}
          clientId={clientId}
        />
      </EBComponentsProvider>
    </>
  );
};

const meta: Meta<typeof OnboardingWizardBasicWithProvider> = {
  title: 'Onboarding Wizard Basic with EBComponentsProvider',
  component: OnboardingWizardBasicWithProvider,
};
export default meta;

type Story = StoryObj<typeof OnboardingWizardBasicWithProvider>;

export const Primary: Story = {
  name: 'Basic OnboardingWizard Basic with EBComponentsProvider',
  args: {
    clientId: '',
    apiBaseUrl: '/api',
    title: 'Onboarding Wizard Basic',
    theme: {
      variables: {
        primaryColor: 'teal',
        borderRadius: '15px',
      },
    },
    onPostClientResponse: (data, error) => {
      if (data) {
        console.log('@@POST client response data', data);
      } else if (error) {
        console.log('@@POST client response error', error);
      }
    },
    onPostClientVerificationsResponse: (data, error) => {
      if (data) {
        console.log('@@POST verifications response data', data);
      } else if (error) {
        console.log('@@POST verifications response error', error);
      }
    },
  },
};
