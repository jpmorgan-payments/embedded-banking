import { OnboardingWizard } from './OnboardingWizard';
import { Stepper } from './Stepper/Stepper';

const OnboardingWizardRoot = () => {
  return (
    <Stepper>
      <OnboardingWizard />;
    </Stepper>
  );
};

export { OnboardingWizardRoot };
