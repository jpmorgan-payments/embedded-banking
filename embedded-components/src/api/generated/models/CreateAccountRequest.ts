/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountCategoryReq } from './AccountCategoryReq';

export type CreateAccountRequest = {
    /**
     * Client identifier
     */
    clientId?: string;
    /**
     * Account label: MAIN, PROJECT, TAXES or RAINY_DAY
     */
    label?: string;
    category?: AccountCategoryReq;
};
