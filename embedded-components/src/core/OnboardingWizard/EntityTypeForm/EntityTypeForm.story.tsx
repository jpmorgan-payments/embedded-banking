import { OnboardingFormProvider } from '../context/form.context';
import { EntityTypeForm } from './EntityTypeForm';

export default {
  title: 'EntityTypeForm',
};

export const Usage = () => (
  <OnboardingFormProvider>
    <EntityTypeForm
      activeStep={0}
      setActiveStep={() => {}}
    />
  </OnboardingFormProvider>
);
