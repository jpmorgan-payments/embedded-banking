/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DebitCardDetails } from './DebitCardDetails';
import type { PaymentType } from './PaymentType';
import type { TransactionRecipientDetails } from './TransactionRecipientDetails';
import type { TransactionStatus } from './TransactionStatus';

export type TransactionResponse = {
    id?: string;
    status?: TransactionStatus;
    type?: PaymentType;
    accountId?: string;
    accountNumber?: string;
    recipient?: TransactionRecipientDetails;
    amount?: number;
    currency?: string;
    memo?: string;
    /**
     * ISO date format - yyyy-MM-dd
     */
    paymentDate?: string;
    c2ProfileId?: string;
    debitCardDetails?: DebitCardDetails;
};
