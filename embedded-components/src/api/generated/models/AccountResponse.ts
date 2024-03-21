/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountCategory } from './AccountCategory';
import type { AccountState } from './AccountState';
import type { PaymentRoutingInformationDto } from './PaymentRoutingInformationDto';

export type AccountResponse = {
    /**
     * Account identifier
     */
    id: string;
    /**
     * Client identifier
     */
    clientId?: string;
    /**
     * Account label
     */
    label: string;
    state: AccountState;
    paymentRoutingInformation?: PaymentRoutingInformationDto;
    /**
     * The date and time the account was created. For the client first account created during onboarding, this is close to the date and time that the client passes onboarding checks. For all other accounts, the timestamp is generated within a few seconds of the new account being requested.
     */
    createdAt: string;
    category: AccountCategory;
};
