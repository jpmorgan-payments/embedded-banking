import { LinkedAccountWidget } from '@/core/LinkedAccountWidget';
import { OnboardingWizard } from '@/core/OnboardingWizard';
import { DecisionMakerForm } from '@/core/OnboardingWizard/DecisionMakersForm/DecisionMakersForm';
import { AdditionalDecisionMakersForm } from '@/core/OnboardingWizard/AdditionalDecisionMakers/AdditionalDecisionMakersForm';

export const componentRegistry = {
  LinkedAccountWidget,
  OnboardingWizard,
  DecisionMakerForm,
  AdditionalDecisionMakersForm
};

export type ComponentRegistry = typeof componentRegistry;
