/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountingType } from './AccountingType';
import type { FeeType } from './FeeType';
import type { OriginatingTransactionType } from './OriginatingTransactionType';
import type { PaymentRoute } from './PaymentRoute';

export type TransactionGetResponseDetails = {
    /**
     * Transaction ID
     */
    id?: string;
    /**
     * The last 4 digits of the creditor account number - PRN or DDA. The digits are preceded by ... to show that the account number has been masked.
     */
    creditorAccount?: string;
    /**
     * The name of the account holder making the payment. This is either the name of the account holder’s business or their first and last name.
     */
    creditorName?: string;
    /**
     * The last 4 digits of the debtor account number - PRN or DDA. The digits are preceded by ... to show that the account number has been masked.
     */
    debtorAccount?: string;
    /**
     * The name of the account holder receiving the payment. This is either the name of the account holder’s business or their first and last name.
     */
    debtorName?: string;
    /**
     * Transaction value
     */
    amount?: number;
    /**
     * Transaction currency
     */
    currency?: string;
    /**
     * Memorandum
     */
    memo?: string;
    /**
     * Date of transaction
     */
    paymentDate?: string;
    /**
     * The transactionId of a transaction which incurred a fee. Use this ID to show the connection between a fee transaction and its originating transaction. This is only available for fee transactions.
     */
    originatingTransactionId?: string;
    feeType?: FeeType;
    originatingTransactionType?: OriginatingTransactionType;
    accountingType?: AccountingType;
    /**
     * The reason a transaction was REJECTED or RETURNED. This is populated only for transactions with 'REJECTED' status. For all other transactions, the value is 'null'.
     */
    rejectedReason?: string;
    paymentRoute?: PaymentRoute;
    /**
     * The date and time the transaction was created.
     */
    creationTimestamp?: string;
};
