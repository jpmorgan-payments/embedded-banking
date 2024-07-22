import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import uniqBy from 'lodash/uniqBy';

// eslint-disable-next-line
import {
  BusinessOwnersStep,
  DecisionMakersStep,
  IndividualDetailsStep,
  IntroStep,
  OrganizationDetailsStep,
  QuestionsStep,
  ReviewStep,
  AttestationStep,
} from '../WizardSteps';

type yInitValues = {
  activeStep: number;
  setCurrentStep: (val: number) => void;
  stepsList: string[];
  stepsListSchema: any[];
  currentFormSchema: any;
  CurrentStep: any;
  buildStepper: (stepNames?: string[]) => any;
  setStepState: (val: any) => void;
  removeSteps: (val: any) => void;
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
  removeSteps: () => {},
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

const stepsWizard: any = {
  Intro: IntroStep,
  Individual: IndividualDetailsStep,
  Organization: OrganizationDetailsStep,
  Questions: QuestionsStep,
  Review: ReviewStep,
  Attestation: AttestationStep,
  'Decision Makers': DecisionMakersStep,
  'Business Owners': BusinessOwnersStep,
};

const sortByRefferenceArray = (refArray: any, targetArray: any) => {
  const orderMap = new Map();

  refArray.forEach((item: any, idx: number) => {
    orderMap.set(item, idx);
  });

  targetArray.sort((a: any, b: any) => {
    const iA = orderMap.has(a.title) ? orderMap.get(a.title) : Infinity;
    const iB = orderMap.has(b.title) ? orderMap.get(b.title) : Infinity;

    return iA - iB;
  });

  return targetArray;
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
      'Business Owners',
      'Decision Makers',
      'Questions',
      'Review',
      'Attestation',
    ]
  ): any => {
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

    setStepState((state) => {
      const newArr = uniqBy(
        [...state.stepsList, ...stepsListSchemaTemp()],
        'title'
      );

      return {
        ...state,
        stepsList: sortByRefferenceArray(stepNames, newArr),
        currentFormSchema: currentSchemaTemp,
        CurrentStep: CurrentStepTemp,
      };
    });
  };

  const removeSteps = (nameList: string[]) => {
    setStepState((state) => {
      return {
        ...state,
        stepsList: [
          ...stepsList.filter((step: any) => {
            return !nameList.includes(step.title);
          }),
        ],
      };
    });
  };

  useEffect(() => {
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
        removeSteps,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};

export { StepperProvider, StepperContext, useStepper };
