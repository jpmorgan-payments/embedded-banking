import { FC } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Step, Stepper } from '@/components/ui/stepper';

import { InitialStepForm } from './InitialStepForm/InitialStepForm';
import { OnboardingContextProvider } from './OnboardingContextProvider/OnboardingContextProvider';

const steps = [
  { label: 'Initial step', children: <InitialStepForm /> },
  { label: 'Individual details', children: <div>WIP</div> },
];

type OnboardingWizardBasicProps = {
  clientId?: string;
};

export const OnboardingWizardBasic: FC<OnboardingWizardBasicProps> = ({
  clientId,
}) => {
  return (
    <OnboardingContextProvider clientId={clientId}>
      <Card className="eb-component">
        <CardHeader>
          <CardTitle>Onboarding</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="eb-flex eb-w-full eb-flex-col eb-gap-4">
            <Stepper variant="circle" initialStep={0} steps={steps}>
              {steps.map((stepProps, index) => {
                const { children, ...rest } = stepProps;
                return (
                  <Step key={index} {...rest}>
                    <div className="eb-px-1">{children}</div>
                  </Step>
                );
              })}
            </Stepper>
          </div>
        </CardContent>
      </Card>
    </OnboardingContextProvider>
  );
};
