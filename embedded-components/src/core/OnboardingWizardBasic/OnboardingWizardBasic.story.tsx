import { StoryObj } from '@storybook/react';

import { OnboardingWizardBasic } from './OnboardingWizardBasic';

export default {
  title: 'Onboarding Wizard Basic',
  component: OnboardingWizardBasic,
};

export const Default: StoryObj<typeof OnboardingWizardBasic> = {
  args: {
    isMockBaseUrl: false,
  },
};
