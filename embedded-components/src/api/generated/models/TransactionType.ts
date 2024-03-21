/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Defines the transaction according to specific types. For example, whether money has been paid into or out of the account.
 */
export enum TransactionType {
    PAYIN = 'PAYIN',
    PAYTO = 'PAYTO',
    PAYINTO = 'PAYINTO',
    TRANSFER = 'TRANSFER',
    PAYOUT = 'PAYOUT',
    PAYIN_REVERSAL = 'PAYIN_REVERSAL',
    PAYOUT_REVERSAL = 'PAYOUT_REVERSAL',
    MISC_CREDIT = 'MISC_CREDIT',
    MISC_DEBIT = 'MISC_DEBIT',
    UNDEFINED = 'UNDEFINED',
    PAYINTORECEIPT = 'PAYINTORECEIPT',
    PAYOUTCOLLECTION = 'PAYOUTCOLLECTION',
    PAYINTOCOLLECTION = 'PAYINTOCOLLECTION',
    PAYINTO_RETURN = 'PAYINTO_RETURN',
    PAYOUTCOLLECTION_RETURN = 'PAYOUTCOLLECTION_RETURN',
    PAYINTOCOLLECTION_RETURN = 'PAYINTOCOLLECTION_RETURN',
    RETURN = 'RETURN',
    CARD = 'CARD',
    FEE = 'FEE',
}
