/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DebitCard } from './DebitCard';
import type { PageMetaData } from './PageMetaData';

export type DebitCardsResponse = {
    metadata: PageMetaData;
    /**
     * List of debit cards for a specific client
     */
    items: Array<DebitCard>;
};
