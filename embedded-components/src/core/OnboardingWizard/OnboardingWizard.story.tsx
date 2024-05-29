import type { Meta, StoryObj } from '@storybook/react';

import { OnboardingWizardRoot } from './OnboardingWizardRoot';

// export default {
//   title: 'Onboarding Wizard',
// };

// export const Usage = () => <OnboardingWizardRoot />;

const meta: Meta<typeof OnboardingWizardRoot> = {
  title: 'Onboarding Wizar',
  component: OnboardingWizardRoot,
};
export default meta;

type Story = StoryObj<typeof OnboardingWizardRoot>;

export const Default: Story = {
  // parameters: {
  //   baseUrl: 'https://api-mock.payments.jpmorgan.com/tsapi/ef/v2',
  // },
};

