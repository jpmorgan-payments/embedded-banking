/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListWebhookResponse } from '../models/ListWebhookResponse';
import type { WebhookRequest } from '../models/WebhookRequest';
import type { WebhookResponse } from '../models/WebhookResponse';
import type { WebhookUpdateRequest } from '../models/WebhookUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WebhooksService {

    /**
     * List webhooks
     * List all your webhooks
     * @param page Page Number
     * @param limit Number of records per page.
     * @returns ListWebhookResponse Ok.
     * @throws ApiError
     */
    public static listWebhooks(
page?: number,
limit: number = 25,
): CancelablePromise<ListWebhookResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/webhooks',
            query: {
                'page': page,
                'limit': limit,
            },
            errors: {
                400: `Bad Request`,
                401: `Forbidden`,
                403: `Unauthorized`,
                404: `Service Unavailable`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

    /**
     * Create a webhook subscription.
     * Create a webhook subscription
     * @param requestBody Create a new webhook request.
     * @returns WebhookResponse Created.
     * @throws ApiError
     */
    public static createWebhook(
requestBody: WebhookRequest,
): CancelablePromise<WebhookResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/v1/webhooks',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Forbidden`,
                403: `Unauthorized`,
                404: `Service Unavailable`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

    /**
     * Get a webhook subscription by ID.
     * Get details of your subscription to a specific webhook.
     * @param id Unique identifier for webhook subscription
     * @returns WebhookResponse Ok.
     * @throws ApiError
     */
    public static getWebhook(
id: string,
): CancelablePromise<WebhookResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/webhooks/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Forbidden`,
                403: `Unauthorized`,
                404: `Service Unavailable`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

    /**
     * Update a webhook by ID.
     * Add or Remove webhook subscriptions and change a webhook status to ACTIVE or INACTIVE
     * @param id Unique identifier of the webhook to be updated
     * @param requestBody Update an existing webhook subscription.
     * @returns WebhookResponse OK.
     * @throws ApiError
     */
    public static updateWebhook(
id: string,
requestBody: WebhookUpdateRequest,
): CancelablePromise<WebhookResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/v1/webhooks/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Forbidden`,
                403: `Unauthorized`,
                404: `Service Unavailable`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

}
