import {
  RootConfig,
  RootConfigProvider,
} from '@/core/EBComponentsProvider/RootConfigProvider';

import { OnboardingFormProvider } from '../../context/form.context';
import { OnboardingWizardSchema } from '../../OnboardingWizardSchema';
import { StepperProvider } from '../../Stepper/Stepper';
import { QuestionsStep } from './QuestionsStep';

export default {
  title: 'Questions Step Schema',
};

export interface OnboardQuestionsProps extends RootConfig {
  isMock?: boolean;
  title?: string;
  // clientId?: string;
  // onResigtration: ({ clientId }: { clientId: string }) => void;
}

//TODO: props types needs to have
const OnboardQuestions = ({
  clientId,
  onRegistration,
  ...props
}: OnboardQuestionsProps) => {
  return (
    <RootConfigProvider clientOptions={{ clientId, onRegistration }}>
      <StepperProvider>
        <OnboardingFormProvider>
          <OnboardingWizardSchema {...props}>
            <QuestionsStep />
          </OnboardingWizardSchema>
        </OnboardingFormProvider>
      </StepperProvider>
    </RootConfigProvider>
  );
};

export { OnboardQuestions };
