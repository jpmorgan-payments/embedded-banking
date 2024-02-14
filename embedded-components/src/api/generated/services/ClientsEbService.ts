/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClientInformationResponse } from '../models/ClientInformationResponse';
import type { ClientVerificationsInformationRequest } from '../models/ClientVerificationsInformationRequest';
import type { ClientVerificationsInformationResponse } from '../models/ClientVerificationsInformationResponse';
import type { CreateClientRequest } from '../models/CreateClientRequest';
import type { ListClientInformationResponse } from '../models/ListClientInformationResponse';
import type { UpdateClientRequest } from '../models/UpdateClientRequest';
import type { UpdateClientResponse } from '../models/UpdateClientResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClientsEbService {

    /**
     * List clients
     * Returns a list of Embedded Finance clients associated with your platform.
     * @param token JWT Client token
     * @param limit Number of records per page.
     * @param page Page Number
     * @returns ListClientInformationResponse Ok.
     * @throws ApiError
     */
    public static getAllClients(
token?: string,
limit: number = 25,
page?: number,
): CancelablePromise<ListClientInformationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/clients',
            headers: {
                'token': token,
            },
            query: {
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
     * Create client
     * Creates a new client.
     * @param requestBody 
     * @returns ClientInformationResponse OK
     * @throws ApiError
     */
    public static postClients(
requestBody?: CreateClientRequest,
): CancelablePromise<ClientInformationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/v1/clients',
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
     * Get client
     * Returns details for a specific client using their unique identifier.
     * @param id Unique identifier for a client.
     * @param token JWT Client token
     * @returns ClientInformationResponse Ok.
     * @throws ApiError
     */
    public static getClientDetails(
id: string,
token?: string,
): CancelablePromise<ClientInformationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/clients/{id}',
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
     * Update client
     * Updates information about a specified client.
     * @param id Unique identifier for a client.
     * @param token JWT Client token
     * @param requestBody 
     * @returns UpdateClientResponse OK
     * @throws ApiError
     */
    public static updateClients(
id: string,
token?: string,
requestBody?: UpdateClientRequest,
): CancelablePromise<UpdateClientResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/v1/clients/{id}',
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
     * Get client verifications
     * Get current and outstanding verifications for a given client. These tell clients what is required to complete onboarding.
     * @param id Unique identifier for a client.
     * @param token JWT Client token
     * @returns ClientVerificationsInformationResponse Ok.
     * @throws ApiError
     */
    public static getClientVerification(
id: string,
token?: string,
): CancelablePromise<ClientVerificationsInformationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/clients/{id}/verifications',
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
     * Add client verifications
     * Adds verification information provided by the client to continue onboarding.
     * @param id Unique identifier for a client.
     * @param requestBody Client verification to add to the system.
     * @param token JWT Client token
     * @returns ClientVerificationsInformationResponse Created.
     * @throws ApiError
     */
    public static addClientVerification(
id: string,
requestBody: ClientVerificationsInformationRequest,
token?: string,
): CancelablePromise<ClientVerificationsInformationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/v1/clients/{id}/verifications',
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
