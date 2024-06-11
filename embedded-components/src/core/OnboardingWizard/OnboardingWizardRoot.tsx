import {
  RootConfig,
  RootConfigProvider,
} from '../EBComponentsProvider/RootConfigProvider';
import { OnboardingFormProvider } from './context/form.context';
import { OnboardingWizard } from './OnboardingWizard';
import { StepperProvider } from './Stepper/Stepper';

export interface OnboardingWizardRootProps extends RootConfig {
  isMock?: boolean;
  title?: string;
  // clientId?: string;
  // onResigtration: ({ clientId }: { clientId: string }) => void;
}

//TODO: props types needs to have
const OnboardingWizardRoot = ({
  clientId,
  onRegistration,
  ...props
}: OnboardingWizardRootProps) => {
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
