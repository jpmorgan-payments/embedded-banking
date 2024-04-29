import { createContext, FC, ReactNode, useContext, useState } from 'react';

type yInitValues = {
  activeStep: number;
  setCurrentStep: (val: number) => void;
};
const initValues: yInitValues = {
  activeStep: 0,
  setCurrentStep: () => {},
};
const StepperContext = createContext(initValues);

const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('Stepper Context not found');
  }
  return context;
};

type yStepper = {
  children: ReactNode;
};
const Stepper: FC<yStepper> = ({ children }) => {
  const [steps, setActiveStep] = useState(initValues);

  const stateStepper = {
    activeStep: steps.activeStep,
    setCurrentStep(step: number) {
      setActiveStep((state) => {
        return { ...state, activeStep: step };
      });
    },
  };

  return (
    <StepperContext.Provider value={stateStepper}>
      {children}
    </StepperContext.Provider>
  );
};

export { Stepper, useStepper };
