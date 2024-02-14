/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Merchant } from './Merchant';

export type DebitCardDetails = {
    cardPaymentRoutingNumber?: string;
    cardLast4?: string;
    cardSerialNumber?: string;
    messageType?: string;
    cardTransactionType?: string;
    isa?: string;
    surcharge?: number;
    merchant?: Merchant;
};
