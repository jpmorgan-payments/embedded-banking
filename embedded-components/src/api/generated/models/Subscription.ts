/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The webhooks you are subscribed to. Each subscription contains events about which you are notified via HTTPS request to your pre-configured server URL.
 */
export type Subscription = {
    /**
     * The event types to be notified of.
     */
    eventType: Subscription.eventType;
};

export namespace Subscription {

    /**
     * The event types to be notified of.
     */
    export enum eventType {
        TRANSACTION_COMPLETED = 'TRANSACTION_COMPLETED',
        TRANSACTION_FAILED = 'TRANSACTION_FAILED',
        CLIENT_ONBOARDING = 'CLIENT_ONBOARDING',
        REMITTANCE_ACKNACK = 'REMITTANCE_ACKNACK',
        REMITTANCE_TSR = 'REMITTANCE_TSR',
    }


}
