import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Step, Stepper } from '@/components/ui/stepper';

import { InitialStepForm } from './InitialStepForm/InitialStepForm';

const steps = [
  { label: 'Step 1', children: <InitialStepForm /> },
  { label: 'Step 2', children: <div>goodbye</div> },
];

export const OnboardingWizardBasic = () => {
  return (
    <Card className="eb-component">
      <CardHeader>
        <CardTitle>Onboarding</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="eb-flex eb-w-full eb-flex-col eb-gap-4">
          <Stepper variant="circle" initialStep={0} steps={steps}>
            {steps.map((stepProps, index) => (
              <Step key={index} {...stepProps} />
            ))}
          </Stepper>
        </div>
      </CardContent>
    </Card>
  );
};
