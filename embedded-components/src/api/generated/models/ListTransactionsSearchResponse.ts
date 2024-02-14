/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PageMetaData } from './PageMetaData';
import type { TransactionsSearchResponse } from './TransactionsSearchResponse';

export type ListTransactionsSearchResponse = {
    metadata: PageMetaData;
    /**
     * List of transactions meeting the request criteria
     */
    items: Array<TransactionsSearchResponse>;
};
