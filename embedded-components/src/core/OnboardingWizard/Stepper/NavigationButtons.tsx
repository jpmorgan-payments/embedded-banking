import { Button } from '@/components/ui/button';

type NavigationButtonsProps = {
  activeStep: number;
  setActiveStep: any;
  form: any;
  onSubmit: () => any;
};

const NavigationButtons = ({
  activeStep,
  setActiveStep,
  form,
  onSubmit,
}: NavigationButtonsProps) => {
  const handleSubmit = () => {
    const errors = form?.formState?.errors;
    onSubmit();
    if (Object.values(errors).length === 0) setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div className="eb-grid eb-grid-cols-2">
      {activeStep !== 0 && (
        <Button className="eb-bg-black" onClick={handleBack}>
          Back
        </Button>
      )}
      <Button className="eb-bg-black" onClick={handleSubmit}>
        Next
      </Button>
    </div>
  );
};

export default NavigationButtons;
