/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListDocumentsResponse } from '../models/ListDocumentsResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DocumentsService {

    /**
     * List document details
     * Retrieves a list of document details.
 * 
     * @param token JWT Client token
     * @param clientId Unique Client identifier
     * @param partyId Unique Party identifier.
     * @param platformId Unique identifier for the platform.
     * @param page Page Number
     * @param limit Number of records per page.
     * @returns ListDocumentsResponse Ok.
     * @throws ApiError
     */
    public static smbdoGetAllDocumentDetails(
token?: string,
clientId?: string,
partyId?: string,
platformId?: string,
page?: number,
limit: number = 25,
): CancelablePromise<ListDocumentsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/do/v1/documents',
            headers: {
                'token': token,
            },
            query: {
                'clientId': clientId,
                'partyId': partyId,
                'platformId': platformId,
                'page': page,
                'limit': limit,
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
     * Get document details
     * Retrieve details of a document.
 * 
     * @param id Unique document identifier.
     * @param token JWT Client token
     * @returns ListDocumentsResponse Ok.
     * @throws ApiError
     */
    public static smbdoGetDocumentDetail(
id: string,
token?: string,
): CancelablePromise<ListDocumentsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/do/v1/documents/{id}',
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
     * Download a document
     * Download a document using its unique identifier.
     * @param id Unique Document identifier.
     * @param token JWT Client token
     * @returns any Ok.
     * @throws ApiError
     */
    public static smbdoDownloadDocument(
id: string,
token?: string,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/do/v1/documents/{id}/file',
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
