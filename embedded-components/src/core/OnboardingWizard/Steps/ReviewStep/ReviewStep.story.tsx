import { OnboardingFormProvider } from '../../context/form.context';
import { ReviewStep } from './ReviewStep';

export default {
  title: 'Review Step',
};

export const Usage = () => (
  <OnboardingFormProvider>
    <ReviewStep activeStep={1} setActiveStep={() => {}} />
  </OnboardingFormProvider>
);
