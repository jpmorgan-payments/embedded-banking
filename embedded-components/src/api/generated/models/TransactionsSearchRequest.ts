/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RequestTransactionStatus } from './RequestTransactionStatus';
import type { RequestTransactionType } from './RequestTransactionType';

export type TransactionsSearchRequest = {
    /**
     * An alternate transaction ID provided by the client when initiating the transaction
     */
    alternateTransactionId?: string;
    /**
     * Debtor account number which requested transactions should have.
     */
    accountNumber?: string;
    /**
     * Transaction Identifier which requested transactions should have.
     */
    transactionId?: string;
    /**
     * Amount which requested transactions should have.
     */
    amountEquals?: string;
    /**
     * Amount which requested transactions should be less than.
     */
    amountLessThan?: string;
    /**
     * Amount which requested transactions should be greater than.
     */
    amountGreaterThan?: string;
    /**
     * Recipient account number which requested transactions should have.
     */
    recipientAccount?: string;
    paymentType?: RequestTransactionType;
    /**
     * Date before which requested transactions should have occurred.
     */
    dateLessThan?: string;
    /**
     * Date after which requested transactions should have occurred.
     */
    dateGreaterThan?: string;
    /**
     * Date on which requested transactions should have occurred.
     */
    dateEquals?: string;
    /**
     * Date and time before which requested transactions should have occurred.
     */
    dateTimeLessThan?: string;
    /**
     * Date and time after which requested transactions should have occurred.
     */
    dateTimeGreaterThan?: string;
    status?: RequestTransactionStatus;
};
