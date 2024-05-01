import { LinkedAccountWidget } from '@/core/LinkedAccountWidget';
import { OnboardingWizard } from '@/core/OnboardingWizard';
import { AdditionalDecisionMakersForm } from '@/core/OnboardingWizard/AdditionalDecisionMakers/AdditionalDecisionMakersForm';
import { BusinessDetails } from '@/core/OnboardingWizard/BusinessDetailsStep/BusinessDetailsStep';
import { DecisionMakerForm } from '@/core/OnboardingWizard/DecisionMakersForm/DecisionMakersForm';
import { EntityTypeForm } from '@/core/OnboardingWizard/Steps/EntityTypeStep/EntityTypeStep';
import { ReviewStep } from '@/core/OnboardingWizard/Steps/ReviewStep/ReviewStep';

export const componentRegistry = {
  LinkedAccountWidget,
  OnboardingWizard,
  EntityTypeForm,
  DecisionMakerForm,
  AdditionalDecisionMakersForm,
  BusinessDetails,
  ReviewStep,
};

export type ComponentRegistry = typeof componentRegistry;
