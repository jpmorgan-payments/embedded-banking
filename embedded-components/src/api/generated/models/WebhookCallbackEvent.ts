/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApiErrorV2 } from './ApiErrorV2';

export type WebhookCallbackEvent = {
    /**
     * Unique identifier of the event
     */
    eventId: string;
    eventType: WebhookCallbackEvent.eventType;
    resourceType: WebhookCallbackEvent.resourceType;
    error?: ApiErrorV2;
    resource: Record<string, any>;
};

export namespace WebhookCallbackEvent {

    export enum eventType {
        TRANSACTION_COMPLETED = 'TRANSACTION_COMPLETED',
        TRANSACTION_FAILED = 'TRANSACTION_FAILED',
        CLIENT_ONBOARDING = 'CLIENT_ONBOARDING',
    }

    export enum resourceType {
        TRANSACTIONS = 'TRANSACTIONS',
        CLIENTS = 'CLIENTS',
    }


}
