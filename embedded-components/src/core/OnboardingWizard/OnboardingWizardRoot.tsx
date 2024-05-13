import { OnboardingWizard } from './OnboardingWizard';
import { StepperProvider } from './Stepper/Stepper';

const OnboardingWizardRoot = () => {
  return (
    <StepperProvider>
      <OnboardingWizard />
    </StepperProvider>
  );
};

export { OnboardingWizardRoot };
