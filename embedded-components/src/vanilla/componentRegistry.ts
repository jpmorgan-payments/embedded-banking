import { LinkedAccountWidget } from '@/core/LinkedAccountWidget';
import { OnboardingWizard } from '@/core/OnboardingWizard';
import { EntityTypeForm } from '@/core/OnboardingWizard/EntityTypeForm/EntityTypeForm';

export const componentRegistry = {
  LinkedAccountWidget,
  OnboardingWizard,
  EntityTypeForm,
};

export type ComponentRegistry = typeof componentRegistry;
