import { useContext } from 'react';

import { StepperContext } from './Stepper';

const useStepper = () => {
  const context = useContext(StepperContext);

  if (!context) {
    throw new Error('Stepper Context not found');
  }
  return context;
};

export { useStepper };
