/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClientSummaryResponse } from './ClientSummaryResponse';
import type { PageMetaDataSmbdo } from './PageMetaDataSmbdo';

/**
 * Collection of clients.
 */
export type ClientListResponse = {
    metadata: PageMetaDataSmbdo;
    clients: Array<ClientSummaryResponse>;
};
