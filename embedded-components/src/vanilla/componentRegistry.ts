import { LinkedAccountWidget } from '@/core/LinkedAccountWidget';
import { OnboardingWizard } from '@/core/OnboardingWizard';
import { AdditionalDecisionMakersForm } from '@/core/OnboardingWizard/AdditionalDecisionMakers/AdditionalDecisionMakersForm';
import { BusinessDetails } from '@/core/OnboardingWizard/BusinessDetails/BusinessDetails';
import { DecisionMakerForm } from '@/core/OnboardingWizard/DecisionMakersForm/DecisionMakersForm';
import { EntityTypeForm } from '@/core/OnboardingWizard/EntityTypeForm/EntityTypeForm';

export const componentRegistry = {
  LinkedAccountWidget,
  OnboardingWizard,
  EntityTypeForm,
  DecisionMakerForm,
  AdditionalDecisionMakersForm,
  BusinessDetails,
};

export type ComponentRegistry = typeof componentRegistry;
