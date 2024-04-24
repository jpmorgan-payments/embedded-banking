import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { EntityTypeForm } from './EntityTypeForm/EntityTypeForm';

// import { DecisionMakerForm } from './DecisionMakersForm/DecisionMakersForm';
// import { AdditionalDecisionMakersForm } from './AdditionalDecisionMakers/AdditionalDecisionMakersForm';

export const OnboardingWizard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding Wizards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="eb-flex eb-items-center eb-space-x-4 eb-rounded-md eb-border eb-p-5">
          <EntityTypeForm
            onSubmit={(val: any) => {
              console.log('@@submit', val);
            }}
          />
          {/* <DecisionMakerForm
            onSubmit={() => {
              console.log('@@submit');
            }}
          /> */}
          MAIN STEPPER
          {/* <AdditionalDecisionMakersForm/> */}
        </div>
      </CardContent>
    </Card>
  );
};
