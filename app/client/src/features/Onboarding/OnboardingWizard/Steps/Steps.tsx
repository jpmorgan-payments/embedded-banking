import { BusinessDetailsStep } from './BusinessDetailsStep/BusinessDetailsStep';
import { SoleProprietorBusinessDetailsStep } from './BusinessDetailsStep/SoleProprietorBusinessDetailsStep';
import type {
  BusinessDetailsStepValues,
  SoleProprietorBusinessDetailsStepValues,
} from './BusinessDetailsStep/BusinessDetailsStep.schema';

import { ControllerDetailsStep } from './ControllerDetailsStep/ControllerDetailsStep';
import { SoleProprietorControllerDetailsStep } from './ControllerDetailsStep/SoleProprietorControllerDetailsStep';
import type {
  ControllerDetailsStepValues,
  SoleProprietorControllerDetailsStepValues,
} from './ControllerDetailsStep/ControllerDetailsStep.schema';

import { BusinessOwnersStep } from './BusinessOwnersStep/BusinessOwnersStep';
import type { BusinessOwnersStepValues } from './BusinessOwnersStep/BusinessOwnersStep.schema';

import { ReviewStep } from './ReviewStep/ReviewStep';
import type { ReviewStepValues } from './ReviewStep/ReviewStep.schema';

export const StepsLLC = [
  BusinessDetailsStep,
  ControllerDetailsStep,
  BusinessOwnersStep,
  ReviewStep,
];

export const StepsSP = [
  SoleProprietorBusinessDetailsStep,
  SoleProprietorControllerDetailsStep,
  ReviewStep,
];

export type OnboardingValuesLLC = BusinessDetailsStepValues &
  ControllerDetailsStepValues &
  BusinessOwnersStepValues &
  ReviewStepValues;

export type OnboardingValuesSP = SoleProprietorBusinessDetailsStepValues &
  SoleProprietorControllerDetailsStepValues &
  ReviewStepValues;
