/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Subscription } from './Subscription';

export type WebhookResponse = {
    /**
     * The unique identifier of this webhook
     */
    id: string;
    subscriptions: Array<Subscription>;
    /**
     * The status of this webhook.
     */
    status: WebhookResponse.status;
    /**
     * The date and time the webhook was created
     */
    createdAt: string;
    /**
     * The date and time the webhook was updated
     */
    updatedAt: string;
};

export namespace WebhookResponse {

    /**
     * The status of this webhook.
     */
    export enum status {
        ACTIVE = 'ACTIVE',
        INACTIVE = 'INACTIVE',
    }


}
