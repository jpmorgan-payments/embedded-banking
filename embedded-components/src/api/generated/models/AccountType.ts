/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Type of bank account, either CHECKING or SAVINGS. Only required for ACH payments. Exclude field from payload completely if not needed.
 */
export enum AccountType {
    CHECKING = 'CHECKING',
    SAVINGS = 'SAVINGS',
}
