import type { Meta, StoryObj } from '@storybook/react';

import { onRegistrationProp } from '../EBComponentsProvider/RootConfigProvider';
import { OnboardingWizardRoot } from './OnboardingWizardRoot';

// export default {
//   title: 'Onboarding Wizard',
// };

// export const Usage = () => <OnboardingWizardRoot />;

const meta: Meta<typeof OnboardingWizardRoot> = {
  title: 'Onboarding Wizard',
  component: OnboardingWizardRoot,
};
export default meta;

type Story = StoryObj<typeof OnboardingWizardRoot>;

export const Default: Story = {
  args: {
  onRegistration: ({ clientId }: onRegistrationProp) => {
    console.log('@@clientId', clientId);
  },
}
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
