/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Payment routing status. Identifies whether the account is active, which means it has been used within the last 13 months. An account with the status INACTIVE is changed to ACTIVE as soon as a transaction is made on the account.
 */
export enum PaymentRoutingStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}
