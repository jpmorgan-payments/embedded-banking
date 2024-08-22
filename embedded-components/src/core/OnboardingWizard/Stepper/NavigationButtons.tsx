import { Button } from '@/components/ui/button';

type NavigationButtonsProps = {
  activeStep: number;
  setActiveStep: any;
  onSubmit?: any;
  disableNext?: boolean;
  disabled?: boolean;
  lastStep?: boolean;
} & React.PropsWithChildren;

const NavigationButtons = ({
  activeStep,
  setActiveStep,
  onSubmit,
  disableNext,
  disabled,
  children,
}: NavigationButtonsProps) => {
  return (
    <div className="eb-mt-20 eb-grid eb-grid-cols-2">
      <div className="eb-flex eb-justify-start">
        {activeStep !== 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setActiveStep(activeStep - 1);
            }}
            disabled={disabled}
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
          disabled={disableNext || disabled}
        >
          {children ? children : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default NavigationButtons;
