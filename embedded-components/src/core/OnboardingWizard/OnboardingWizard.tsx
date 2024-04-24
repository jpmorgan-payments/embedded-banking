import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EntityTypeForm } from './EntityTypeForm/EntityTypeForm';
import { DecisionMakerForm } from './DecisionMakersForm/DecisionMakersForm';
import { AdditionalDecisionMakerForm } from './AdditionalDecisionMakers/AdditionalDecisionMakersForm';

export const OnboardingWizard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding Wizards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="eb-flex eb-items-center eb-space-x-4 eb-rounded-md eb-border eb-p-5">
           {/* <EntityTypeForm
            onSubmit={() => {
              console.log('@@submit');
            }}
          />  */}
           {/* <EntityTypeForm
            onSubmit={() => {
              console.log('@@submit');
            }}
          />  */}
          {/* <DecisionMakerForm
            onSubmit={() => {
              console.log('@@submit');
            }}
          /> */}
          <AdditionalDecisionMakerForm/>
        </div>
      </CardContent>
    </Card>
  );
};
