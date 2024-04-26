import { LinkedAccountWidget } from '@/core/LinkedAccountWidget';
import { OnboardingWizard } from '@/core/OnboardingWizard';
import { EntityTypeForm } from '@/core/OnboardingWizard/EntityTypeForm/EntityTypeForm';
import { DecisionMakerForm } from '@/core/OnboardingWizard/DecisionMakersForm/DecisionMakersForm';
import { AdditionalDecisionMakersForm } from '@/core/OnboardingWizard/AdditionalDecisionMakers/AdditionalDecisionMakersForm';

export const componentRegistry = {
  LinkedAccountWidget,
  OnboardingWizard,
  EntityTypeForm,
  DecisionMakerForm,
  AdditionalDecisionMakersForm
};

export type ComponentRegistry = typeof componentRegistry;
