/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Status of a party validation. Missing fields result in `NEEDS_INFO`.
 * 
 */
export enum ValidationStatus {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    NOT_VALIDATED = 'NOT_VALIDATED',
    NEEDS_INFO = 'NEEDS_INFO',
    NEEDS_REVIEW = 'NEEDS_REVIEW',
    VALIDATED = 'VALIDATED',
}
