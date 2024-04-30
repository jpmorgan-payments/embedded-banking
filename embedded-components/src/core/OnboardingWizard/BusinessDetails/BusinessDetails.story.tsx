import { OnboardingFormProvider } from '../context/form.context';
import { BusinessDetails } from './BusinessDetails';

export default {
  title: 'BusinessDetails',
};

export const Usage = () => (
  <OnboardingFormProvider>
  <BusinessDetails
   activeStep={2} setActiveStep={()=> {}}
  />
  </OnboardingFormProvider>
);
