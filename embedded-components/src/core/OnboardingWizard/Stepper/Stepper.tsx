import { createContext, FC, ReactNode, useContext, useState } from 'react';

type yInitValues = {
  activeStep: number;
  setCurrentStep: (val: number) => void;
  // setActiveStep: any;
};
const initValues: yInitValues = {
  activeStep: 0,
  setCurrentStep: () => {},
  // setActiveStep: () => {},
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
const StepperProvider: FC<yStepper> = ({ children }) => {
  const [steps, setActiveStep] = useState(initValues);
  const { activeStep } = steps;

  const setCurrentStep = (step: number) => {
    setActiveStep((state) => {
      return {
        ...state,
        activeStep: step,
      };
    });
  };

  return (
    <StepperContext.Provider value={{ activeStep, setCurrentStep }}>
      {children}
    </StepperContext.Provider>
  );
};

export { StepperProvider, useStepper };
