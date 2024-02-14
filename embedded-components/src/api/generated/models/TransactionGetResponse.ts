/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountingType } from './AccountingType';
import type { DebitCardDetails } from './DebitCardDetails';
import type { TransactionGetResponseDetails } from './TransactionGetResponseDetails';
import type { TransactionStatus } from './TransactionStatus';
import type { TransactionType1 } from './TransactionType1';

export type TransactionGetResponse = (TransactionGetResponseDetails & {
status?: TransactionStatus;
transactionType?: TransactionType1;
debitCardDetails?: DebitCardDetails;
} & {
/**
 * Transaction ID
 */
id: string;
/**
 * The name of the account holder making the payment. This is either the name of the account holder’s business or their first and last name.
 */
creditorName: string;
/**
 * The name of the account holder receiving the payment. This is either the name of the account holder’s business or their first and last name.
 */
debtorName: string;
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
memo: string;
/**
 * Date of transaction
 */
paymentDate: string;
accountingType: AccountingType;
status: TransactionStatus;
transactionType: TransactionType1;
});
