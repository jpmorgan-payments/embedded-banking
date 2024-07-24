import {
  RootConfig,
  RootConfigProvider,
} from '../EBComponentsProvider/RootConfigProvider';
import { OnboardingFormProvider } from './context/form.context';
import { OnboardingWizardSchema } from './OnboardingWizardSchema';
import { StepperProvider } from './Stepper/Stepper';

export interface OnboardingWizardInitProps extends RootConfig {
  isMock?: boolean;
  title?: string;
  // clientId?: string;
  // onResigtration: ({ clientId }: { clientId: string }) => void;
}

//TODO: props types needs to have
const OnboardingWizard = ({
  clientId,
  onRegistration,
  ...props
}: OnboardingWizardInitProps) => {
  return (
    <RootConfigProvider clientOptions={{ clientId, onRegistration, ...props }}>
      <StepperProvider>
        <OnboardingFormProvider>
          <OnboardingWizardSchema {...props} />
        </OnboardingFormProvider>
      </StepperProvider>
    </RootConfigProvider>
  );
};

export { OnboardingWizard };