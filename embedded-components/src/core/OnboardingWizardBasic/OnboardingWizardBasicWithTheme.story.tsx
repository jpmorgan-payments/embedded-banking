/* eslint-disable import/no-useless-path-segments */
import type { Meta, StoryObj } from '@storybook/react';

import {
  ApiErrorV2,
  ClientResponse,
  ClientVerificationsInformationResponse,
} from '@/api/generated/embedded-banking.schemas';
import { EBComponentsProvider } from '@/core/EBComponentsProvider';

import { OnboardingWizardBasicWithProvider } from './OnboardingWizardBasic.story';

const meta: Meta<typeof OnboardingWizardBasicWithProvider> = {
  title: 'Onboarding Wizard Basic / Theme',
  component: OnboardingWizardBasicWithProvider,
};
export default meta;

type Story = StoryObj<typeof OnboardingWizardBasicWithProvider>;

export const Primary: Story = {
  name: 'Default theme',
  args: {
    clientId: '',
    apiBaseUrl: '/',
    title: 'Onboarding (Default theme)',
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

export const Dark: Story = {
  name: 'Dark theme',
  ...Primary,
  args: {
    ...Primary.args,
    title: 'Onboarding (Dark theme)',
    theme: {
      colorScheme: 'dark',
    },
  },
};

export const Example1: Story = {
  name: 'Example with different font',
  ...Primary,
  args: {
    ...Primary.args,
    title: 'Onboarding (Different font)',
    theme: {
      variables: {
        primaryColor: 'magenta',
        borderRadius: '30px',
        fontFamily: 'Nunito sans',
      },
    },
  },
};
