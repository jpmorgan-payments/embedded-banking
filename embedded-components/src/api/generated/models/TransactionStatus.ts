/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The current status of the transaction as it is processed:
 * * `PENDING` - The transaction is still being processed.
 * * `CANCELED` - The transaction has been canceled.
 * * `COMPLETED` - The transaction has been completed.
 * * `COMPLETED_WITH_EXCEPTIONS` - The transaction has completed, but not all of the requested criteria has been fulfilled.
 * * `REJECTED` - The transaction has been rejected and will not be completed.
 * * `RETURNED` - The payment rail has been unable to complete the payment specified recipient. The payment has been returned to the originator.
 * * `PARTIALLY_COMPLETED` - Not all transactions in the batch have been completed.
 * * `UNDEFINED` - The status of this transaction cannot be found.
 * 
 */
export enum TransactionStatus {
    PENDING = 'PENDING',
    CANCELED = 'CANCELED',
    COMPLETED = 'COMPLETED',
    COMPLETED_WITH_EXCEPTIONS = 'COMPLETED_WITH_EXCEPTIONS',
    COMPLETED_NOT_IN_TARGET_WALLET = 'COMPLETED_NOT_IN_TARGET_WALLET',
    REJECTED = 'REJECTED',
    RETURNED = 'RETURNED',
    PARTIALLY_COMPLETED = 'PARTIALLY_COMPLETED',
    UNDEFINED = 'UNDEFINED',
}
