import type { Meta, StoryObj } from '@storybook/react';

import { onRegistrationProp } from '../EBComponentsProvider/RootConfigProvider';
import {
  stepReviewMockNoQuestions,
  stepReviewMockWithQuestions,
} from './mocks/stepReview.mock';
import { OnboardingWizardInit } from './OboardingWizardInit';

// export default {
//   title: 'Onboarding Wizard',
// };

// export const Usage = () => <OnboardingWizardInit />;

const meta: Meta<typeof OnboardingWizardInit> = {
  title: 'Onboarding Wizard Schema',
  component: OnboardingWizardInit,
};
export default meta;

type Story = StoryObj<typeof OnboardingWizardInit>;

export const Default: Story = {
  args: {
    onRegistration: ({ clientId }: onRegistrationProp) => {
      console.log('@@clientId', clientId);
    },
  },
};

export const OnboardingWithClientIDWithoutQuestions: Story = {
  args: {
    isMockResponse: false,
    title: 'Welcome back',
    jurisdictions: ['US', 'Canada'],
    clientId: '3000000316',
    products: [],
    onRegistration: ({ clientId }: onRegistrationProp) => {
      console.log('@@clientId', clientId);
    },
    mockSteps: {
      review: stepReviewMockWithQuestions,
    },
  },
};
