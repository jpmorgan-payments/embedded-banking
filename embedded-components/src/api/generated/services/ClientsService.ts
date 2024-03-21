/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClientListResponse } from '../models/ClientListResponse';
import type { ClientResponse } from '../models/ClientResponse';
import type { CreateClientRequestSmbdo } from '../models/CreateClientRequestSmbdo';
import type { UpdateClientRequestSmbdo } from '../models/UpdateClientRequestSmbdo';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClientsService {

    /**
     * List clients
     * Returns a list of Embedded Finance clients associated with your platform.
     * @param token JWT Client token
     * @param limit Number of records per page.
     * @param page Page Number
     * @returns ClientListResponse Ok.
     * @throws ApiError
     */
    public static smbdoListClients(
token?: string,
limit: number = 25,
page?: number,
): CancelablePromise<ClientListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/do/v1/clients',
            headers: {
                'token': token,
            },
            query: {
                'limit': limit,
                'page': page,
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
     * Create client
     * Creates a client.
     * @param token JWT Client token
     * @param requestBody 
     * @returns ClientResponse Created.
     * @throws ApiError
     */
    public static smbdoPostClients(
token?: string,
requestBody?: CreateClientRequestSmbdo,
): CancelablePromise<ClientResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/do/v1/clients',
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
     * Get client
     * Retrieve client details by its ID.
     * @param id Unique identifier for a client.
     * @param token JWT Client token
     * @returns ClientResponse Created.
     * @throws ApiError
     */
    public static smbdoGetClient(
id: string,
token?: string,
): CancelablePromise<ClientResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/do/v1/clients/{id}',
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
     * Update client
     * Updates a client.
     * @param id Unique identifier for a client.
     * @param token JWT Client token
     * @param requestBody 
     * @returns ClientResponse OK.
     * @throws ApiError
     */
    public static smbdoUpdateClient(
id: string,
token?: string,
requestBody?: UpdateClientRequestSmbdo,
): CancelablePromise<ClientResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/do/v1/clients/{id}',
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

    /**
     * Perform client verifications
     * Performs client verifications
     * @param id Unique identifier for a client.
     * @param token JWT Client token
     * @returns any Accepted.
     * @throws ApiError
     */
    public static smbdoPostClientVerifications(
id: string,
token?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/do/v1/clients/{id}/verifications',
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
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
                503: `Service Unavailable`,
            },
        });
    }

}
