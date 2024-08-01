import {
  RootConfig,
  RootConfigProvider,
} from '../EBComponentsProvider/RootConfigProvider';
import { ErrorProvider } from './context/error.context';
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
  onPostClientsVerfication,
  ...props
}: OnboardingWizardInitProps) => {
  return (
    <RootConfigProvider
      clientOptions={{ clientId, onPostClientsVerfication, ...props }}
    >
      <StepperProvider>
        <OnboardingFormProvider>
          <ErrorProvider>
            <OnboardingWizardSchema {...props} />
          </ErrorProvider>
        </OnboardingFormProvider>
      </StepperProvider>
    </RootConfigProvider>
  );
};

export { OnboardingWizard };
