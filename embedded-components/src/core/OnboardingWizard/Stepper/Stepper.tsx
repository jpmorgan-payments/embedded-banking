import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
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

type yInitValues = {
  activeStep: number;
  setCurrentStep: (val: number) => void;
  stepsList: string[] | undefined;
  stepsListSchema: any[];
  currentFormSchema: any;
  CurrentStep: any;
  buildStepper: (stepNames?: string[]) => any;
  setStepState: (val: any) => void;
  // setActiveStep: any;
};
const initValues: yInitValues = {
  activeStep: 0,
  setCurrentStep: () => {},
  stepsList: undefined,
  stepsListSchema: [],
  CurrentStep: null,
  currentFormSchema: null,
  buildStepper: () => {},
  setStepState: () => {},
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
  const [steps, setStepState] = useState(initValues);

  const {
    activeStep,
    CurrentStep,
    currentFormSchema,
    stepsListSchema,
    stepsList,
  } = steps;

  const setCurrentStep = (step: number) => {
    setStepState((state) => {
      return {
        ...state,
        activeStep: step,
      };
    });
  };

  const buildStepper = (
    stepNames: string[] = ['Init', 'Individual', 'Questions', 'Review']
  ): any => {
    console.log('@@SCbuildStepper', stepNames);

    const stepsListSchemaTemp: any = () => {
      return stepNames.map((name: string) => {
        return stepsWizard[name];
      });
    };

    const currentSchemaTemp = stepsListSchemaTemp()[activeStep]?.formSchema;
    const CurrentStepTemp = stepsListSchemaTemp()?.[activeStep];

    console.log(
      '@@LIST',
      activeStep,
      stepsListSchemaTemp(),
      '>>',
      currentSchemaTemp,
      CurrentStepTemp
    );

    setStepState((state) => {
      return {
        ...state,
        stepsList: stepsListSchemaTemp(),
        currentFormSchema: currentSchemaTemp,
        CurrentStep: CurrentStepTemp,
      };
    });
  };

  useEffect(() => {
    console.log('@@LIST@@', stepsList);
    if (activeStep > 0) {
      buildStepper(
        stepsList?.length ? stepsList.map((val: any) => val?.title) : undefined
      );
    } else if (!activeStep && stepsList?.length) {
      buildStepper(stepsList.map((val: any) => val?.title));
    }
  }, [activeStep]);

  return (
    <StepperContext.Provider
      value={{
        activeStep,
        setCurrentStep,
        buildStepper,
        stepsListSchema,
        currentFormSchema,
        CurrentStep,
        setStepState,
        stepsList,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};

export { StepperProvider, StepperContext };
