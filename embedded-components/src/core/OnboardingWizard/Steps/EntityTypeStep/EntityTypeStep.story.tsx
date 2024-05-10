import { OnboardingFormProvider } from '../../context/form.context';
import { EntityTypeStep } from './EntityTypeStep';

export default {
  title: 'EntityTypeForm',
};

export const Usage = () => (
  <OnboardingFormProvider>
    <EntityTypeStep
      activeStep={0}
      setActiveStep={() => {}}
    />
  </OnboardingFormProvider>
);
