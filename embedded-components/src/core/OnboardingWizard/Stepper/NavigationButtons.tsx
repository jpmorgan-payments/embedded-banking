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
      <div className="eb-flex eb-justify-start">
        {activeStep !== 0 && (
          <Button className="eb-bg-black eb-w-24" onClick={handleBack}>
            Back
          </Button>
        )}
      </div>
      <div className="eb-flex eb-justify-end">
        <Button
          className="eb-bg-black eb-w-24 "
          type="submit"
          onClick={onSubmit}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default NavigationButtons;
