/* eslint-disable import/no-useless-path-segments */
import type { Meta, StoryObj } from '@storybook/react';
import { OnboardingWizardBasicWithProvider } from './OnboardingWizardBasic.story';

const meta: Meta<typeof OnboardingWizardBasicWithProvider> = {
  title: 'Onboarding Wizard Basic / Environment',
  component: OnboardingWizardBasicWithProvider,
};
export default meta;

type Story = StoryObj<typeof OnboardingWizardBasicWithProvider>;

export const Primary: Story = {
  name: 'UAT',
  args: {
    clientId: '',
    apiBaseUrl: '/paste-uat-url-here',
    headers: {
      api_gateway_client_id: 'EBCLIENT22',
    },
    title: 'Sole Proprietorship',
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
  parameters: {},
};

export const Dev: Story = {
  name: 'DEV',
  ...Primary,
  args: {
    clientId: '',
    apiBaseUrl: '/paste-uat-url-here',
    headers: {
      api_gateway_client_id: 'OBTSTSTCL1',
    },
  },
  parameters: {},
};
