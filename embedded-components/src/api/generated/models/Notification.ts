/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Notification = {
    /**
     * The unique identifier of this notification
     */
    id?: string;
    /**
     * The unique identifier of the subscription related to this notification
     */
    subscriptionId?: string;
    /**
     * The unique identifier of the subscription details for this notification
     */
    subscriptionDetailsId?: string;
    /**
     * Creation timestamp of this notification eg.(yyyy-MM-ddTHH:MM:SSZ)
     */
    createdAt?: string;
    /**
     * Timestamp of when this notification was published eg.(yyyy-MM-ddTHH:MM:SSZ)
     */
    publishedAt?: string;
    eventType?: string;
    source?: string;
    target?: string;
    content?: string;
    error?: string;
    retryCount?: number;
    maxRetry?: number;
};
