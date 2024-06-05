import { Button } from '@/components/ui/button';

type NavigationButtonsProps = {
  activeStep: number;
  setActiveStep: any;
  onSubmit?: any;
  disableNext?: boolean;
};

const NavigationButtons = ({
  activeStep,
  setActiveStep,
  onSubmit,
  disableNext,
}: NavigationButtonsProps) => {
  return (
    <div className="eb-mt-20 eb-grid eb-grid-cols-2">
      <div className="eb-flex eb-justify-start">
        {activeStep !== 0 && (
          <Button
            variant="outline"
            onClick={() => {
              setActiveStep(activeStep - 1);
            }}
          >
            Back
          </Button>
        )}
      </div>
      <div className="eb-flex eb-justify-end">
        <Button
          type="submit"
          onClick={() => {
            if (onSubmit) {
              onSubmit();
            }
          }}
          disabled={disableNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default NavigationButtons;
