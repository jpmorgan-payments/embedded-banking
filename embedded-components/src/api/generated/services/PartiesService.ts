/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePartyRequest } from '../models/CreatePartyRequest';
import type { PartyListResponse } from '../models/PartyListResponse';
import type { PartyResponse } from '../models/PartyResponse';
import type { UpdatePartyRequest } from '../models/UpdatePartyRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PartiesService {

    /**
     * List parties
     * Retrieves a list of parties.
     * @param token JWT Client token
     * @param limit Number of records per page.
     * @param page Page Number
     * @param parentPartyId ID of the parent party.
     * @returns PartyListResponse Ok.
     * @throws ApiError
     */
    public static smbdoListParties(
token?: string,
limit: number = 25,
page?: number,
parentPartyId?: string,
): CancelablePromise<PartyListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/do/v1/parties',
            headers: {
                'token': token,
            },
            query: {
                'limit': limit,
                'page': page,
                'parentPartyId': parentPartyId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
                503: `Service Unavailable`,
            },
        });
    }

    /**
     * Create party
     * Creates a new party.
     * @param token JWT Client token
     * @param requestBody 
     * @returns PartyResponse Created.
     * @throws ApiError
     */
    public static smbdoPostParties(
token?: string,
requestBody?: CreatePartyRequest,
): CancelablePromise<PartyResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/do/v1/parties',
            headers: {
                'token': token,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
                503: `Service Unavailable`,
            },
        });
    }

    /**
     * Get party
     * Details a party by its unique identifier.
     * @param id Unique identifier for a party.
     * @param token JWT Client token
     * @returns PartyResponse Ok.
     * @throws ApiError
     */
    public static smbdoGetParty(
id: string,
token?: string,
): CancelablePromise<PartyResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/do/v1/parties/{id}',
            path: {
                'id': id,
            },
            headers: {
                'token': token,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
                503: `Service Unavailable`,
            },
        });
    }

    /**
     * Update party
     * Updates a party.
     * @param id Unique identifier for a party.
     * @param token JWT Client token
     * @param requestBody 
     * @returns PartyResponse Ok.
     * @throws ApiError
     */
    public static smbdoUpdateParty(
id: string,
token?: string,
requestBody?: UpdatePartyRequest,
): CancelablePromise<PartyResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/do/v1/parties/{id}',
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
                401: `Unauthenticated`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
                503: `Service Unavailable`,
            },
        });
    }

}
