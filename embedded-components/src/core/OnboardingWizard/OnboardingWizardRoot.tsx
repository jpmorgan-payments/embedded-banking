import { OnboardingFormProvider } from './context/form.context';
import { OnboardingWizard } from './OnboardingWizard';
import { StepperProvider } from './Stepper/Stepper';

const OnboardingWizardRoot = (props: any) => {
  return (
    <StepperProvider>
      <OnboardingFormProvider>
        <OnboardingWizard {...props} />
      </OnboardingFormProvider>
    </StepperProvider>
  );
};

export { OnboardingWizardRoot };
