import {
  RootConfig,
  RootConfigProvider,
} from '../EBComponentsProvider/RootConfigProvider';
import { OnboardingFormProvider } from './context/form.context';
import { OnboardingWizard } from './OnboardingWizard';
import { StepperProvider } from './Stepper/Stepper';

export interface OnboardingWizardRoot extends RootConfig {
  isMock?: boolean;
  title: string;
}

//TODO: props types needs to have
const OnboardingWizardRoot = ({
  clientId,
  onRegistration,
  ...props
}: OnboardingWizardRoot) => {
  console.log('@@clientOptions', props);

  return (
    <RootConfigProvider clientOptions={{ clientId, onRegistration }}>
      <StepperProvider>
        <OnboardingFormProvider>
          <OnboardingWizard {...props} />
        </OnboardingFormProvider>
      </StepperProvider>
    </RootConfigProvider>
  );
};

export { OnboardingWizardRoot };
