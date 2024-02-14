/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentRequestListResponse } from '../models/DocumentRequestListResponse';
import type { DocumentRequestResponse } from '../models/DocumentRequestResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DocumentRequestsService {

    /**
     * List document requests
     * Get a list of document requests.
 * 
     * @param token JWT Client token
     * @param clientId Unique Client identifier.
     * @param partyId Unique Party identifier.
     * @returns DocumentRequestListResponse Ok.
     * @throws ApiError
     */
    public static smbdoListDocumentRequests(
token?: string,
clientId?: string,
partyId?: string,
): CancelablePromise<DocumentRequestListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/do/v1/document-requests',
            headers: {
                'token': token,
            },
            query: {
                'clientId': clientId,
                'partyId': partyId,
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
     * Get document request
     * Returns details for a document request using its unique identifier.
     * @param id Unique identifier for a document request.
     * @param token JWT Client token
     * @returns DocumentRequestResponse Ok.
     * @throws ApiError
     */
    public static smbdoGetDocumentRequest(
id: string,
token?: string,
): CancelablePromise<DocumentRequestResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/do/v1/document-requests/{id}',
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

}
