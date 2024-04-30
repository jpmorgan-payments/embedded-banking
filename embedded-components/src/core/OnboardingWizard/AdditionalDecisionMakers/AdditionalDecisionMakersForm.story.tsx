
import { OnboardingFormProvider } from '../context/form.context';
import { AdditionalDecisionMakersForm } from './AdditionalDecisionMakersForm';

export default {
  title: 'Additional Decision Makers Form',
};


export const Usage = () => <OnboardingFormProvider><AdditionalDecisionMakersForm activeStep={2} setActiveStep={()=> {}}  /></OnboardingFormProvider>;
