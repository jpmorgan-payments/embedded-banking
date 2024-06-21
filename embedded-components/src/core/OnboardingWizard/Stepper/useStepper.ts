import { useContext } from 'react';

import { StepperContext } from './Stepper';

const useStepper = () => {
  const context = useContext(StepperContext);
  console.log('@@Curr@@', context);

  if (!context) {
    throw new Error('Stepper Context not found');
  }
  return context;
};

export { useStepper };
