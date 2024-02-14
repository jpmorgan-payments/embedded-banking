/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The transaction type of the originating transaction that incurred a fee. This is only available for fee transactions. * ACH_PAYOUT - the original transaction was a payout made by ACH payment route. * RTP_PAYOUT - the original transaction was a payout made by ACH payment route. * WIRE_PAYOUT - the original transaction was a payout made by WIRE payment route. * DEBIT_CARD_REQUEST - the original transaction was a debit card request. * FEE - the original transaction was a fee that was reversed.
 */
export enum OriginatingTransactionType {
    ACH_PAYOUT = 'ACH_PAYOUT',
    RTP_PAYOUT = 'RTP_PAYOUT',
    WIRE_PAYOUT = 'WIRE_PAYOUT',
    DEBIT_CARD_REQUEST = 'DEBIT_CARD_REQUEST',
    FEE = 'FEE',
}
