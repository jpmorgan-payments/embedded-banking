import { OnboardingFormProvider } from '../context/form.context';
import { DecisionMakerForm } from './DecisionMakersForm';

export default {
  title: 'Decision Makers Form',
};

export const Usage = () => <OnboardingFormProvider><DecisionMakerForm activeStep={1} setActiveStep={()=> {}} /></OnboardingFormProvider>;
