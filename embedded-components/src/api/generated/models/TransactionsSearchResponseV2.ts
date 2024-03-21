/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OriginatingTransactionType } from './OriginatingTransactionType';
import type { PaymentTypeResponse } from './PaymentTypeResponse';
import type { TransactionStatus } from './TransactionStatus';

export type TransactionsSearchResponseV2 = {
    /**
     * JPMC-generated unique identifier of a transaction
     */
    id?: string;
    /**
     * Transaction reference id provided by client
     */
    transactionReferenceId?: string;
    /**
     * ID to show the connection between this transaction and its originating transaction.
     */
    originatingId?: string;
    status?: TransactionStatus;
    type?: PaymentTypeResponse;
    originatingTransactionType?: OriginatingTransactionType;
    /**
     * The ledger balance shows the total of all settled transactions at the time the request is made. Transactions which are in a pending state and transactions of type hold are excluded from this balance. The ledger balance is updated only when a transaction is settled.
     */
    ledgerBalance?: number;
    /**
     * The clientId of the client whose account is to be debited.
     */
    debtorClientId?: string;
    /**
     * The last 4 digits of the debtor account number (PRN). The digits are preceded by ... to show that the account number has been masked.
     */
    debtorAccountId?: string;
    /**
     * The last 4 digits of the debtor account number (PRN). The digits are preceded by ... to show that the account number has been masked.
     */
    debtorAccountNumber?: string;
    /**
     * The name of the account holder receiving the payment. This is either the name of the account holder’s business or their first and last name.
     */
    debtorName?: string;
    /**
     * The clientId of the client whose account is to be credited.
     */
    creditorClientId?: string;
    /**
     * The last 4 digits of the creditor account number (PRN). The digits are preceded by ... to show that the account number has been masked.
     */
    creditorAccountId?: string;
    /**
     * The last 4 digits of the creditor account number (PRN). The digits are preceded by ... to show that the account number has been masked.
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
     * Transaction amount
     */
    amount?: number;
    /**
     * Transaction currency
     */
    currency?: string;
    /**
     * Transaction creation date in YYYY-MM-DD format.
     */
    paymentDate?: string;
    /**
     * The date and time the transaction was created.
     */
    createdAt?: string;
    /**
     * A measure of how many times an account has been updated by a new transaction. The posting version is incremented by 1 whenever there's a an event on the account. It can be used to track the order in which transactions have occurred, so you can present the user with the most recent transactions first.
     */
    postingVersion?: number;
};
