/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CardDetailResponse } from '../models/CardDetailResponse';
import type { CardUpdateRequest } from '../models/CardUpdateRequest';
import type { CardUpdateResponse } from '../models/CardUpdateResponse';
import type { CreateDebitCardRequest } from '../models/CreateDebitCardRequest';
import type { CreateDebitCardResponse } from '../models/CreateDebitCardResponse';
import type { DebitCardsResponse } from '../models/DebitCardsResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DebitCardsService {

    /**
     * List cards
     * Returns a list of debit cards for a specific client.
     * @param token JWT Client token
     * @param page Current page number.
     * @param limit Number of records per page.
     * @returns DebitCardsResponse List debit cards
     * @throws ApiError
     */
    public static getDebitCards(
token?: string,
page?: number,
limit: number = 25,
): CancelablePromise<DebitCardsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/debit-cards',
            headers: {
                'token': token,
            },
            query: {
                'page': page,
                'limit': limit,
            },
            errors: {
                400: `Bad Request`,
                401: `Forbidden`,
                403: `Unauthorized`,
                404: `Service Unavailable`,
                500: `ERROR.`,
                503: `ERROR.`,
            },
        });
    }

    /**
     * Create debit card
     * Creates a new debit card.
     * @param token JWT Client token
     * @param requestBody Customer account details required to create a new debit card.
     * @returns CreateDebitCardResponse Ok.
     * @throws ApiError
     */
    public static createDebitCard(
token?: string,
requestBody?: CreateDebitCardRequest,
): CancelablePromise<CreateDebitCardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/v1/debit-cards',
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
     * Get card
     * Returns card ID and iFrame link for virtual card details for a specific card.
     * @param id Card Identifier
     * @param token JWT Client token
     * @returns CardDetailResponse Ok.
     * @throws ApiError
     */
    public static getDebitCard(
id: string,
token?: string,
): CancelablePromise<CardDetailResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/debit-cards/{id}',
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
     * Update card
     * Updates card details, such as PIN reset or to lock a lost card.
     * @param id Unique identifier for the debit card.
     * @param requestBody Card update info required to either set/reset PIN, lock/unlock card set card as replaced, or set card as cancelled.
     * @param token JWT Client token
     * @returns CardUpdateResponse Ok.
     * @throws ApiError
     */
    public static updateCard(
id: string,
requestBody: CardUpdateRequest,
token?: string,
): CancelablePromise<CardUpdateResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/v1/debit-cards/{id}',
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
