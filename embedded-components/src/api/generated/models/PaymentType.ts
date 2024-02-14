/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Payment method - ACH, RTP, WIRE, ACH, TRANSFER. Only ACH (for payouts) and TRANSFER (for payments between embedded accounts) are used in Embedded Payments transactions.
 */
export enum PaymentType {
    RTP = 'RTP',
    WIRE = 'WIRE',
    ACH = 'ACH',
    TRANSFER = 'TRANSFER',
}
