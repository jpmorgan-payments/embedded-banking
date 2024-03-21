/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Subscription } from './Subscription';

/**
 * Update a webhook - add, remove subscriptions or change the status of your webhook
 */
export type WebhookUpdateRequest = {
    subscriptions: Array<Subscription>;
    /**
     * Allowed status - ACTIVE or INACTIVE
     */
    status: WebhookUpdateRequest.status;
};

export namespace WebhookUpdateRequest {

    /**
     * Allowed status - ACTIVE or INACTIVE
     */
    export enum status {
        ACTIVE = 'ACTIVE',
        INACTIVE = 'INACTIVE',
    }


}
