import { UseFormReturnType } from '@mantine/form';

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

export type organizationType =
  | 'SOLE_PROPRIETORSHIP'
  | 'LIMITED_LIABILITY_COMPANY'
  | 'S_CORPORATION'
  | 'C_CORPORATION'
  | 'UNINCORPORATED_ASSOCIATION'
  | 'PARTNERSHIP'
  | 'PUBLICLY_TRADED_COMPANY'
  | 'NON_PROFIT_CORPORATION'
  | 'GOVERNMENT_ENTITY'
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

export type ValuesMapType = {
  title?: string | JSX.Element;
  titleRightContent?: JSX.Element;
  subtitle?: string | JSX.Element;
  entries: {
    label: string;
    value?: string | JSX.Element;
  }[];
}[];
