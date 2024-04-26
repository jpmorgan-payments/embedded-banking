import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { DecisionMakerForm } from './DecisionMakersForm/DecisionMakersForm';
import { EntityTypeForm } from './EntityTypeForm/EntityTypeForm';
import { AdditionalDecisionMakersForm } from './AdditionalDecisionMakers/AdditionalDecisionMakersForm';

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
    <AdditionalDecisionMakersForm
      key={1}
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
        <div className="eb-flex eb-items-center eb-space-x-4 eb-rounded-md eb-border eb-p-5">
          {steps? steps[activeStep] : <></>}
        </div>
      </CardContent>
    </Card>
  );
};
