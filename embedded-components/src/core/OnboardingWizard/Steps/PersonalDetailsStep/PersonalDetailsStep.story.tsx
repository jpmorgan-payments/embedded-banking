import { OnboardingFormProvider } from '../../context/form.context';
import { PersonalDetailsStep } from './PersonalDetailsStep';

export default {
  title: 'Decision Makers Form',
};

export const Usage = () => <OnboardingFormProvider><PersonalDetailsStep activeStep={1} setActiveStep={()=> {}} /></OnboardingFormProvider>;
