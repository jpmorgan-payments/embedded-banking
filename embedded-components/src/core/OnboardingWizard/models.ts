import { UseFormReturnType } from '@mantine/form';

// import type { TablerIcon } from '@tabler/icons';

// import type { OnboardingValuesBusiness, OnboardingValuesSP } from './Steps';

export type EntityType =
  | 'Privately Owned Business'
  | 'Sole Proprietorship'
  | '';

export type LegalStructure =
  | 'Corporation'
  | 'Limited Partnership'
  | 'Limited Liability Company'
  | 'Sole Proprietorship'
  | '';

// export type OnboardingValues = OnboardingValuesBusiness & OnboardingValuesSP;

export interface Step {
  (props: {
    form: UseFormReturnType<any>;
    entityType: EntityType;
    initialValues?: Partial<any>;
  }): JSX.Element;

  label?: string;
  description?: string;
  Icon?: any;
  initialValues?: Record<string, unknown>;
  // TODO: resolve this type
  validationSchema?: any; // yup.AnySchema | ((val: string) => yup.AnySchema);
  nextLabel?: string;
  schemaLabel?: string;
}
