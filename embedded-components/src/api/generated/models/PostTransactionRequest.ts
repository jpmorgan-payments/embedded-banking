/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentType } from './PaymentType';
import type { TransactionRecipientDetails } from './TransactionRecipientDetails';

export type PostTransactionRequest = {
    type: PaymentType;
    /**
     * ID of the account to make the payment from
     */
    originatingAccount: string;
    amount: number;
    /**
     * Payment currency - currently supported: USD
     */
    currency: PostTransactionRequest.currency;
    /**
     * Memorandum
     */
    memo?: string;
    /**
     * ISO date format - yyyy-MM-dd
     */
    paymentDate: string;
    /**
     * Payment recipient, either recipient or recipient id must be provided
     */
    recipient?: TransactionRecipientDetails;
    /**
     * Payment recipient Id, either recipient or recipient id must be provided
     */
    recipientId?: string;
};

export namespace PostTransactionRequest {

    /**
     * Payment currency - currently supported: USD
     */
    export enum currency {
        USD = 'USD',
    }


}
