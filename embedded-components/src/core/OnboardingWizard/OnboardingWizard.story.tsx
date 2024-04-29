import { OnboardingWizard } from './OnboardingWizard';
import { Stepper } from './Stepper/Stepper';

export default {
  title: 'Onboarding Wizard',
};

export const Usage = () => (
  <Stepper>
    <OnboardingWizard />
  </Stepper>
);
