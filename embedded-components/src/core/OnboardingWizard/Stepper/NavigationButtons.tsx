import { Button } from '@/components/ui/button';

type NavigationButtonsProps = {
  activeStep: number;
  setActiveStep: any;
  onSubmit: () => any;
};

const NavigationButtons = ({
  activeStep,
  setActiveStep,
  onSubmit,
}: NavigationButtonsProps) => {
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div className="eb-grid eb-grid-cols-2 eb-mt-20">
      {activeStep !== 0 && (
        <Button className="eb-bg-black" onClick={handleBack}>
          Back
        </Button>
      )}
      <Button className="eb-bg-black" type="submit" onClick={onSubmit}>
        Next
      </Button>
    </div>
  );
};

export default NavigationButtons;
