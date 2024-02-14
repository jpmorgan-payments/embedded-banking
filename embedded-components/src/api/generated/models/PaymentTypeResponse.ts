/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The transaction type of the transaction. Some transaction types are not available to be initiated via API and are therefore not included in the transaction request type field.
 */
export enum PaymentTypeResponse {
    RTP = 'RTP',
    WIRE = 'WIRE',
    ACH = 'ACH',
    TRANSFER = 'TRANSFER',
    REVERSAL = 'REVERSAL',
    RETURN = 'RETURN',
    OTHER = 'OTHER',
    CARD = 'CARD',
    FEE = 'FEE',
}
