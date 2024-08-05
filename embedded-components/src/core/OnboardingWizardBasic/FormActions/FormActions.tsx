import { useStepper } from '@/components/ui/stepper';
import { Button } from '@/components/ui';

export const FormActions = () => {
  const { prevStep, isDisabledStep, isLastStep } = useStepper();

  return (
    <div className="eb-flex eb-w-full eb-justify-end eb-gap-4">
      <Button disabled={isDisabledStep} variant="secondary" onClick={prevStep}>
        Previous
      </Button>
      <Button>{isLastStep ? 'Submit' : 'Next'}</Button>
    </div>
  );
};
