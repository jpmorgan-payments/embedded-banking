/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WebhookCallbackEvent } from './WebhookCallbackEvent';

export type TransactionCallbackEvent = (WebhookCallbackEvent & {
resource?: {
id: string;
clientId?: string;
type?: string;
/**
 * ID of the account to make the payment from
 */
debtorAccountId: string;
/**
 * Recipient ID of the account to make the payment to
 */
recipientId?: string;
amount: number;
/**
 * Payment currency
 */
currency: string;
/**
 * The current status of the transaction as it is processed
 */
status?: string;
/**
 * Transaction reference id provided by client
 */
transactionReferenceId?: string;
/**
 * ID to show the connection between this transaction and its originating transaction.
 */
originatingId?: string;
/**
 * ISO date format - yyyy-MM-dd
 */
paymentDate?: string;
};
});
