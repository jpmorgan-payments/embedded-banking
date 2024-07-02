import { OnboardingFormProvider } from '../../context/form.context';
import { BusinessDetailsStep } from './BusinessDetailsStep';

export default {
  title: 'BusinessDetails',
};

export const Usage = () => (
  <OnboardingFormProvider>
  <BusinessDetailsStep
   activeStep={2} setActiveStep={()=> {}}
  />
  </OnboardingFormProvider>
);
