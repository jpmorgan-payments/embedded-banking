/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PageMetaData } from './PageMetaData';
import type { WebhookResponse } from './WebhookResponse';

export type ListWebhookResponse = {
    metadata: PageMetaData;
    /**
     * List of webhooks you have created.
     */
    items: Array<WebhookResponse>;
};
