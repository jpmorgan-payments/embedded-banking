/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListRecipientsResponse } from '../models/ListRecipientsResponse';
import type { MicrodepositAmounts } from '../models/MicrodepositAmounts';
import type { MicrodepositVerificationResponse } from '../models/MicrodepositVerificationResponse';
import type { Recipient } from '../models/Recipient';
import type { RecipientRequest } from '../models/RecipientRequest';
import type { RecipientType } from '../models/RecipientType';
import type { UpdateRecipientRequest } from '../models/UpdateRecipientRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RecipientsService {

    /**
     * List recipients
     * Returns a list of all recipients for a given client profile.
     * @param token JWT Client token
     * @param clientId Unique Client identifier
     * @param type Recipient type to return
     * @param limit Number of records per page.
     * @param page Page Number
     * @returns ListRecipientsResponse Ok.
     * @throws ApiError
     */
    public static getAllRecipients(
token?: string,
clientId?: string,
type?: RecipientType,
limit: number = 25,
page?: number,
): CancelablePromise<ListRecipientsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/recipients',
            headers: {
                'token': token,
            },
            query: {
                'clientId': clientId,
                'type': type,
                'limit': limit,
                'page': page,
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
     * Create recipient
     * Creates a new recipient.
     * @param token JWT Client token
     * @param requestBody 
     * @returns Recipient The recipient was created successfully.
     * @throws ApiError
     */
    public static createRecipient(
token?: string,
requestBody?: RecipientRequest,
): CancelablePromise<Recipient> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/v1/recipients',
            headers: {
                'token': token,
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

    /**
     * Get recipient
     * Returns information about a specific recipient.
     * @param id Recipient ID. A unique identifier for a recipient.
     * @param token JWT Client token
     * @returns Recipient Ok.
     * @throws ApiError
     */
    public static getRecipient(
id: string,
token?: string,
): CancelablePromise<Recipient> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/recipients/{id}',
            path: {
                'id': id,
            },
            headers: {
                'token': token,
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
     * Update recipient
     * Updates details of a recipient, such as adding values for attributes related to payment types. All attributes must be provided in the same format as when creating a recipient. The value partyDetails.type cannot be amended after creation.
     * @param id Recipient ID. A unique identifier for a recipient.
     * @param token JWT Client token
     * @param requestBody 
     * @returns Recipient The recipient was amended successfully.
     * @throws ApiError
     */
    public static amendRecipient(
id: string,
token?: string,
requestBody?: UpdateRecipientRequest,
): CancelablePromise<Recipient> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/v1/recipients/{id}',
            path: {
                'id': id,
            },
            headers: {
                'token': token,
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

    /**
     * Creates a microdeposits verification process.
     * Creates a microdeposits verification process.
     * @param id Recipient ID. A unique identifier for a recipient.
     * @param token JWT Client token
     * @param requestBody 
     * @returns MicrodepositVerificationResponse Ok.
     * @throws ApiError
     */
    public static recipientsVerification(
id: string,
token?: string,
requestBody?: MicrodepositAmounts,
): CancelablePromise<MicrodepositVerificationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/v1/recipients/{id}/verify-microdeposit',
            path: {
                'id': id,
            },
            headers: {
                'token': token,
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
