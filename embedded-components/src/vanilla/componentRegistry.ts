import { LinkedAccountWidget } from '@/core/LinkedAccountWidget';
import { OnboardingWizard } from '@/core/OnboardingWizard';

export const componentRegistry = {
  LinkedAccountWidget,
  OnboardingWizard
};

export type ComponentRegistry = typeof componentRegistry;
