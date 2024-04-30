/* eslint-disable tailwindcss/no-custom-classname */
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdditionalDecisionMakersForm } from './AdditionalDecisionMakers/AdditionalDecisionMakersForm';
import { BusinessDetails } from './BusinessDetails/BusinessDetails';
import { OnboardingFormProvider } from './context/form.context';
import { DecisionMakerForm } from './DecisionMakersForm/DecisionMakersForm';
import { EntityTypeForm } from './EntityTypeForm/EntityTypeForm';
import StepperHeader from './Stepper/StepperHeader';

export const OnboardingWizard = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    <EntityTypeForm
      key={0}
      setActiveStep={setActiveStep}
      activeStep={activeStep}
    />,

    <DecisionMakerForm
      key={1}
      setActiveStep={setActiveStep}
      activeStep={activeStep}
    />,
    <BusinessDetails
      setActiveStep={setActiveStep}
      key={2}
      activeStep={activeStep}
    />,
    <AdditionalDecisionMakersForm
      key={3}
      setActiveStep={setActiveStep}
      activeStep={activeStep}
    />,
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding Wizards</CardTitle>
      </CardHeader>
      <CardContent>
        <OnboardingFormProvider>
          {activeStep !== 0 && (
            <StepperHeader activeStep={activeStep}></StepperHeader>
          )}

          {steps?.map((step, index) => (
            <div
              key={`panel${index}`}
              className={`eb-flex eb-items-center ${activeStep === index ? 'eb-block' : 'eb-hidden'} eb-space-x-4 eb-rounded-md eb-border eb-p-5`}
            >
              {step}
            </div>
          ))}
        </OnboardingFormProvider>
      </CardContent>
    </Card>
  );
};
