import { OnboardingFormProvider } from '../../context/form.context';
import { QuestionsStep } from './QuestionsStep';

export default {
  title: 'Questions Step',
};

export const Usage = () => <OnboardingFormProvider><QuestionsStep activeStep={1} setActiveStep={()=> {}} /></OnboardingFormProvider>;
