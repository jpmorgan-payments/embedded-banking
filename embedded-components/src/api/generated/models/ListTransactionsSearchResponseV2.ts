/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PageMetaData } from './PageMetaData';
import type { TransactionsSearchResponseV2 } from './TransactionsSearchResponseV2';

export type ListTransactionsSearchResponseV2 = {
    metadata: PageMetaData;
    /**
     * List of transactions meeting the request criteria
     */
    items: Array<TransactionsSearchResponseV2>;
};
