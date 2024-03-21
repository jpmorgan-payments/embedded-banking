/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountBalanceDto } from './AccountBalanceDto';

export type AccountBalanceResponse = {
    /**
     * Account identifier
     */
    id: string;
    /**
     * Balance date in ISO date format - yyyy-MM-dd
     */
    date: string;
    /**
     * Balance currency
     */
    currency: string;
    /**
     * List of account balances of type ITAV (interim available balance) or ITBD (interim booked balance)
     */
    balanceTypes: Array<AccountBalanceDto>;
};
