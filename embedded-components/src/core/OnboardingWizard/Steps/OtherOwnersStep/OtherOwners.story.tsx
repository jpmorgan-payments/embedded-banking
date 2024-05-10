
import { OnboardingFormProvider } from '../../context/form.context';
import { OtherOwnersStep } from './OtherOwnersStep';

export default {
  title: 'Other Owners Step',
};


export const Usage = () => <OnboardingFormProvider><OtherOwnersStep activeStep={2} setActiveStep={()=> {}}  /></OnboardingFormProvider>;
