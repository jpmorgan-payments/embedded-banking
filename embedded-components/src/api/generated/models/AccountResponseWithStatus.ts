/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountCategory } from './AccountCategory';
import type { AccountState } from './AccountState';
import type { PaymentRoutingInformationDtoWithStatus } from './PaymentRoutingInformationDtoWithStatus';

export type AccountResponseWithStatus = {
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
    paymentRoutingInformation?: PaymentRoutingInformationDtoWithStatus;
    category: AccountCategory;
    /**
     * Closure Reason
     */
    closureReason?: string;
    /**
     * The date and time the account was created. For the client first account created during onboarding, this is close to the date and time that the client passes onboarding checks. For all other accounts, the timestamp is generated within a few seconds of the new account being requested.
     */
    createdAt: string;
};
