/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentType } from './PaymentType';
import type { schemas_TransactionRecipientDetails } from './schemas_TransactionRecipientDetails';

export type PostTransactionRequestV2 = {
    /**
     * Transaction reference ID provided by client
     */
    transactionReferenceId?: string;
    type?: PaymentType;
    /**
     * ID of the account to make the payment from.
     */
    debtorAccountId?: string;
    /**
     * ID of the account to make the payment to.
     */
    creditorAccountId?: string;
    /**
     * Payment recipient, either recipient or recipient id must be provided for Payouts
     */
    recipient?: schemas_TransactionRecipientDetails;
    /**
     * Reference to the defined payment recipient object
     */
    recipientId?: string;
    /**
     * Transaction value in the given currency
     */
    amount: number;
    /**
     * Transaction currency
     */
    currency: PostTransactionRequestV2.currency;
    /**
     * Memorandum
     */
    memo?: string;
};

export namespace PostTransactionRequestV2 {

    /**
     * Transaction currency
     */
    export enum currency {
        USD = 'USD',
    }


}
