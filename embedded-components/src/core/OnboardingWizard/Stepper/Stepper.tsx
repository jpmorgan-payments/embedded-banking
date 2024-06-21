import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

import {
  IndDetails,
  InitStep,
  OrgDetails,
  QuestionsStep,
  ReviewStep,
} from '../Steps_';
import {
  businessSchema,
  individaulSchema,
  initSchema,
  questionsSchema,
  reviewSchema,
  stepsSchema,
} from '../Steps_/StepsSchema';

type yInitValues = {
  activeStep: number;
  setCurrentStep: (val: number) => void;
  stepsListSchema: any[];
  currentSchema: any;
  CurrentStep: any;
  buildStepper: (clientId?: string) => any;
  // setActiveStep: any;
};
const initValues: yInitValues = {
  activeStep: 0,
  setCurrentStep: () => {},
  stepsListSchema: [],
  CurrentStep: null,
  currentSchema: null,
  buildStepper: () => {},
  // setActiveStep: () => {},
};
const StepperContext = createContext(initValues);

type yStepper = {
  children: ReactNode;
};

const stepsWizard: any = {
  Init: InitStep,
  // Business: OrgDetails,
  Individual: IndDetails,
  Questions: QuestionsStep,
  Review: ReviewStep,
};
const StepperProvider: FC<yStepper> = ({ children }) => {
  const [steps, setActiveStep] = useState(initValues);

  const { activeStep, CurrentStep, currentSchema, stepsListSchema } = steps;

  const setCurrentStep = (step: number) => {
    setActiveStep((state) => {
      return {
        ...state,
        activeStep: step,
      };
    });
  };

  const buildStepper = (clientId: any): any => {
    const stepsListSchemaTemp: any = () => {
      if (clientId) {
        return [reviewSchema];
      }

      return [initSchema, individaulSchema, questionsSchema, reviewSchema];
    };

    const currentSchemaTemp = stepsListSchemaTemp()[activeStep];
    const CurrentStepTemp = stepsWizard[currentSchemaTemp.stepName];

    setActiveStep((state) => {
      return {
        ...state,
        stepsListSchema: stepsListSchemaTemp,
        currentSchema: currentSchemaTemp,
        CurrentStep: CurrentStepTemp,
      };
    });
  };

  return (
    <StepperContext.Provider
      value={{
        activeStep,
        setCurrentStep,
        buildStepper,
        stepsListSchema,
        currentSchema,
        CurrentStep,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};

export { StepperProvider, StepperContext };
