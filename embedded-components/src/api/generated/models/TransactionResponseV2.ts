/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentTypeResponse } from './PaymentTypeResponse';
import type { TransactionStatus } from './TransactionStatus';

export type TransactionResponseV2 = {
    /**
     * JPMC-generated unique ID for the transaction.
     */
    id?: string;
    /**
     * Transaction reference ID provided by client
     */
    transactionReferenceId?: string;
    status: TransactionStatus;
    type?: PaymentTypeResponse;
    /**
     * ID of the on-us account from which to make the payment.
     */
    debtorAccountId?: string;
    /**
     * The last 4 digits of the debtor account number - PRN or DDA. The digits are preceded by ... to show that the account number has been masked.
     */
    debtorAccountNumber?: string;
    /**
     * The name of the account holder receiving the payment. This is either the name of the account holder’s business or their first and last name.
     */
    debtorName?: string;
    /**
     * ID of the on-us account to which to make the payment.
     */
    creditorAccountId?: string;
    /**
     * The last 4 digits of the creditor account number - PRN or DDA. The digits are preceded by ... to show that the account number has been masked.
     */
    creditorAccountNumber?: string;
    /**
     * The name of the account holder making the payment. This is either the name of the account holder’s business or their first and last name.
     */
    creditorName?: string;
    /**
     * Reference to the defined payment recipient object
     */
    recipientId?: string;
    /**
     * Transaction value
     */
    amount: number;
    /**
     * Transaction currency
     */
    currency: string;
    /**
     * Memorandum
     */
    memo?: string;
    /**
     * Transaction date in ISO date format - yyyy-MM-dd
     */
    paymentDate: string;
    /**
     * The date and time the transaction was created.
     */
    createdAt: string;
};
