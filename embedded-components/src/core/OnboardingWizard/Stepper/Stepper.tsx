import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import uniqBy from 'lodash/uniqBy';

import {
  IndDetails,
  InitStep,
  OrgDetails,
  QuestionsStep,
  ReviewStep,
} from '../Steps_';
import { VerificationStep } from '../Steps_/VerificationStep';

type yInitValues = {
  activeStep: number;
  setCurrentStep: (val: number) => void;
  stepsList: string[];
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
  stepsList: [],
  stepsListSchema: [],
  CurrentStep: null,
  currentFormSchema: null,
  buildStepper: () => {},
  setStepState: () => {},
  // setActiveStep: () => {},
};
const StepperContext = createContext(initValues);

const useStepper = () => {
  const context = useContext(StepperContext);
  console.log('@@Curr@@', context);

  if (!context) {
    throw new Error('Stepper Context not found');
  }
  return context;
};

type yStepper = {
  children: ReactNode;
};

const stepsWizard: any = {
  Intro: InitStep,
  Individual: IndDetails,
  Organization: OrgDetails,
  Questions: QuestionsStep,
  Review: ReviewStep,
  Verification: VerificationStep,
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
    stepNames: string[] = [
      'Intro',
      'Individual',
      'Organization',
      'Questions',
      'Review',
      'Verification',
    ]
  ): any => {
    console.log('@@LIST::', stepNames, '>>', activeStep);

    const stepsListSchemaTemp: any = () => {
      return uniqBy(
        [
          ...stepsList,
          ...stepNames.map((name: string) => {
            return stepsWizard[name];
          }),
        ],
        'title'
      ).filter((item) => item);
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
      console.log(
        '@@LIST>$',
        uniqBy([...state.stepsList, ...stepsListSchemaTemp()], 'title'),
        '::',
        CurrentStepTemp,
        CurrentStepTemp?.title
      );

      return {
        ...state,
        stepsList: uniqBy(
          [...state.stepsList, ...stepsListSchemaTemp()],
          'title'
        ),
        currentFormSchema: currentSchemaTemp,
        CurrentStep: CurrentStepTemp,
      };
    });
  };

  useEffect(() => {
    console.log('@@LIST))))', steps);
    // buildStepper(stepsList.map((val: any) => val?.title));
    setStepState((state) => {
      return {
        ...state,
      };
    });
  }, []);

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

export { StepperProvider, StepperContext, useStepper };
