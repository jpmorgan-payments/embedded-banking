import { LinkedAccountWidget } from '@/core/LinkedAccountWidget';
import { OnboardingWizard } from '@/core/OnboardingWizard';
import { AddressForm } from '@/core/OnboardingWizard/Forms/AddressForm/AddressForm';
import { BusinessDetailsStep } from '@/core/OnboardingWizard/Steps/BusinessDetailsStep/BusinessDetailsStep';
import { EntityTypeStep } from '@/core/OnboardingWizard/Steps/EntityTypeStep/EntityTypeStep';
import { ReviewStep } from '@/core/OnboardingWizard/Steps/ReviewStep/ReviewStep';

export const componentRegistry = {
  LinkedAccountWidget,
  OnboardingWizard,
  EntityTypeStep,
  AddressForm,
  ReviewStep,
  BusinessDetailsStep,
};

export type ComponentRegistry = typeof componentRegistry;
