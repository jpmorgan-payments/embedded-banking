import type { Meta, StoryObj } from '@storybook/react';

import { onRegistrationProp } from '../EBComponentsProvider/RootConfigProvider';
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

export const OnboardingWithClientID: Story = {
  args: {
    title: 'Welcome back',
    clientId: '1000010400',
    onRegistration: ({ clientId }: onRegistrationProp) => {
      console.log('@@clientId', clientId);
    },
  },
};
