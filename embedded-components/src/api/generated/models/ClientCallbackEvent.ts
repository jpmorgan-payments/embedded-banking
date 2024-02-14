/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WebhookCallbackEvent } from './WebhookCallbackEvent';

export type ClientCallbackEvent = (WebhookCallbackEvent & {
resource?: {
/**
 * A client's unique ID
 */
clientId: string;
/**
 * The client's status.
 */
status: ClientCallbackEvent.status;
/**
 * `true` if the client has outstanding items, otherwise `false`.
 */
hasOutstandingInformation: boolean;
};
});

export namespace ClientCallbackEvent {

    /**
     * The client's status.
     */
    export enum status {
        APPROVED = 'APPROVED',
        DECLINED = 'DECLINED',
        INFORMATION_REQUESTED = 'INFORMATION_REQUESTED',
        NEW = 'NEW',
        REVIEW_IN_PROGRESS = 'REVIEW_IN_PROGRESS',
        SUSPENDED = 'SUSPENDED',
        TERMINATED = 'TERMINATED',
    }


}
