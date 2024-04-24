import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EntityTypeForm } from './EntityTypeForm/EntityTypeForm';

export const OnboardingWizard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding Wizards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="eb-flex eb-items-center eb-space-x-4 eb-rounded-md eb-border eb-p-5">
          <EntityTypeForm
            onSubmit={() => {
              console.log('@@submit');
            }}
          />
          
        </div>
      </CardContent>
    </Card>
  );
};
