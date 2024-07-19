import type { Meta, StoryObj } from '@storybook/react';

import { onRegistrationProp } from '../EBComponentsProvider/RootConfigProvider';
import {
  stepReviewMockNoQuestions,
  stepReviewMockWithAttestations,
  stepReviewMockWithQuestions,
} from './mocks/stepReview.mock';
import { OnboardingWizard } from './OboardingWizard';

const meta: Meta<typeof OnboardingWizard> = {
  title: 'Onboarding Wizard Schema',
  component: OnboardingWizard,
};
export default meta;

type Story = StoryObj<typeof OnboardingWizard>;

export const Default: Story = {
  argTypes: {
    entityType: {
      options: [
        'SOLE_PROPRIETORSHIP',
        'LIMITED_LIABILITY_COMPANY',
        'S_CORPORATION',
        'C_CORPORATION',
        'UNINCORPORATED_ASSOCIATION',
        'PARTNERSHIP',
        'PUBLICLY_TRADED_COMPANY',
        'NON_PROFIT_CORPORATION',
        'GOVERNMENT_ENTITY',
      ],
      control: { type: 'select' },
      defaultValue: 'LIMITED_LIABILITY_COMPANY',
    },
    jurisdictions: {
      options: ['US', 'Canada', 'UK'],
      control: { type: 'select' },
      defaultValue: 'US',
    },
  },
  args: {
    products: [],
    onRegistration: ({ clientId }: onRegistrationProp) => {
      console.log('@@clientId', clientId);
    },
  },
};

export const OnboardingWithClientIDWithoutQuestions: Story = {
  argTypes: {
    entityType: {
      options: [
        'SOLE_PROPRIETORSHIP',
        'LIMITED_LIABILITY_COMPANY',
        'S_CORPORATION',
        'C_CORPORATION',
        'UNINCORPORATED_ASSOCIATION',
        'PARTNERSHIP',
        'PUBLICLY_TRADED_COMPANY',
        'NON_PROFIT_CORPORATION',
        'GOVERNMENT_ENTITY',
      ],
      control: { type: 'select' },
      defaultValue: 'LIMITED_LIABILITY_COMPANY',
    },
    jurisdictions: {
      options: ['US', 'Canada', 'UK'],
      control: { type: 'select' },
      defaultValue: 'US',
    },
  },
  args: {
    isMockResponse: false,
    title: 'Welcome back',
    jurisdictions: ['US', 'Canada'],
    clientId: '3000000316',
    products: [],
    onRegistration: ({ clientId }: onRegistrationProp) => {
      console.log('@@clientId', clientId);
    },
    mockSteps: {
      review: stepReviewMockNoQuestions,
    },
  },
};

export const OnboardingWithClientIDWithQuestions: Story = {
  argTypes: {
    entityType: {
      options: [
        'SOLE_PROPRIETORSHIP',
        'LIMITED_LIABILITY_COMPANY',
        'S_CORPORATION',
        'C_CORPORATION',
        'UNINCORPORATED_ASSOCIATION',
        'PARTNERSHIP',
        'PUBLICLY_TRADED_COMPANY',
        'NON_PROFIT_CORPORATION',
        'GOVERNMENT_ENTITY',
      ],
      control: { type: 'select' },
      defaultValue: 'LIMITED_LIABILITY_COMPANY',
    },
    jurisdictions: {
      options: ['US', 'Canada', 'UK'],
      control: { type: 'select' },
      defaultValue: 'US',
    },
  },
  args: {
    isMockResponse: true,
    title: 'Welcome back',
    jurisdictions: ['US', 'Canada'],
    clientId: '3000000316',
    products: [],
    onRegistration: ({ clientId }: onRegistrationProp) => {
      console.log('@@clientId', clientId);
    },
    mockSteps: {
      review: stepReviewMockWithQuestions,
    },
  },
};

export const OnboardingWithClientIDWithAttestation: Story = {
  argTypes: {
    entityType: {
      options: [
        'SOLE_PROPRIETORSHIP',
        'LIMITED_LIABILITY_COMPANY',
        'S_CORPORATION',
        'C_CORPORATION',
        'UNINCORPORATED_ASSOCIATION',
        'PARTNERSHIP',
        'PUBLICLY_TRADED_COMPANY',
        'NON_PROFIT_CORPORATION',
        'GOVERNMENT_ENTITY',
      ],
      control: { type: 'select' },
      defaultValue: 'LIMITED_LIABILITY_COMPANY',
    },
  },
  args: {
    isMockResponse: true,
    title: 'Welcome back',
    jurisdictions: ['US', 'Canada'],
    clientId: '3000000350',
    products: [],
    onRegistration: ({ clientId }: onRegistrationProp) => {
      console.log('@@clientId', clientId);
    },
    mockSteps: {
      review: stepReviewMockWithAttestations,
    },
  },
};
