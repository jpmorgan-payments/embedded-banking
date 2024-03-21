/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentTypeResponse } from './PaymentTypeResponse';
import type { TransactionGetResponseDetailsV2 } from './TransactionGetResponseDetailsV2';
import type { TransactionStatus } from './TransactionStatus';

export type TransactionGetResponseV2 = (TransactionGetResponseDetailsV2 & {
status?: TransactionStatus;
} & {
/**
 * Transaction ID
 */
id: string;
type: PaymentTypeResponse;
/**
 * Transaction value
 */
amount: number;
/**
 * Transaction currency
 */
currency: string;
/**
 * Transaction date in ISO date format - yyyy-MM-dd
 */
paymentDate: string;
/**
 * The date and time the transaction was created.
 */
createdAt: string;
status: TransactionStatus;
});
