/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountResponse } from './AccountResponse';
import type { PageMetaData } from './PageMetaData';

export type ListAccountsResponse = {
    metadata: PageMetaData;
    /**
     * List of accounts for a specific client
     */
    items: Array<AccountResponse>;
};
