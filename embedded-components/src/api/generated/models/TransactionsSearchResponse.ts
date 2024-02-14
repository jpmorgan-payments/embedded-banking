/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountingType } from './AccountingType';
import type { PaymentRoute } from './PaymentRoute';
import type { TransactionStatus } from './TransactionStatus';
import type { TransactionType1 } from './TransactionType1';

export type TransactionsSearchResponse = {
    status?: TransactionStatus;
    transactionType?: TransactionType1;
    /**
     * The ledger balance shows the total of all settled transactions at the time the request is made. Transactions which are in a pending state and transactions of type hold are excluded from this balance. The ledger balance is updated only when a transaction is settled.
     */
    ledgerBalance?: number;
    /**
     * The date and time the transaction was created.
     */
    creationTimestamp?: string;
    /**
     * The time and date when the ledger balance was updated.
     */
    effectiveDate?: string;
    /**
     * A measure of how many times an account has been updated by a new transaction. The posting version is incremented by 1 whenever there's a an event on the account. It can be used to track the order in which transactions have occurred, so you can present the user with the most recent transactions first.
     */
    postingVersion?: number;
    /**
     * Unique identifier of a transaction
     */
    transactionId?: string;
    /**
     * The last 4 digits of the debtor account number (PRN). The digits are preceded by ... to show that the account number has been masked.
     */
    debtorAccount?: string;
    /**
     * The last 4 digits of the creditor account number (PRN). The digits are preceded by ... to show that the account number has been masked.
     */
    creditorAccount?: string;
    /**
     * Transaction currency
     */
    currency?: string;
    /**
     * Transaction creation date
     */
    createdDate?: string;
    /**
     * Transaction amount
     */
    amount?: string;
    /**
     * The name of the account holder receiving the payment. This is either the name of the account holder’s business or their first and last name.
     */
    debtorName?: string;
    /**
     * The name of the account holder making the payment. This is either the name of the account holder’s business or their first and last name.
     */
    creditorName?: string;
    accountingType?: AccountingType;
    paymentRoute?: PaymentRoute;
};
