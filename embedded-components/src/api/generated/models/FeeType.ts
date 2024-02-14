/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The type of the fee transaction. Use this to differentiate between the fee transactions that were charged and those that were reversed. * CHARGE - the fee that was incurred as a result of a transaction. * REVERSAL - the fee was incurred and then voided on a transaction.
 */
export enum FeeType {
    CHARGE = 'CHARGE',
    REVERSAL = 'REVERSAL',
}
