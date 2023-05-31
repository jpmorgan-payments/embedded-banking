import type { AnySchema } from 'yup';
import type { UseFormReturnType } from '@mantine/form';
import type { TablerIcon } from '@tabler/icons';

import type { OnboardingValuesLLC, OnboardingValuesSP } from './Steps';

export type EntityType = 'LLC' | 'Sole Proprietor' | '';

export type OnboardingValues = OnboardingValuesLLC & OnboardingValuesSP;

export interface Step {
  ({
    form,
    entityType,
  }: {
    form: UseFormReturnType<OnboardingValues>;
    entityType?: EntityType;
  }): JSX.Element;
  label?: string;
  description?: string;
  Icon?: TablerIcon;
  initialValues?: Record<string, any>;
  validationSchema?: AnySchema;
  nextLabel?: string;
}
