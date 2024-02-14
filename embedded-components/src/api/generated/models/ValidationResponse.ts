/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PartyField } from './PartyField';
import type { ValidationStatus } from './ValidationStatus';
import type { ValidationType } from './ValidationType';

/**
 * List of validation info.
 */
export type ValidationResponse = Array<{
validationStatus?: ValidationStatus;
validationType?: ValidationType;
/**
 * Comments/basic response related to the workflow step of validation response.
 */
comments?: string;
fields?: Array<PartyField>;
identities?: Array<string>;
documentRequestIds?: Array<string>;
}>;
