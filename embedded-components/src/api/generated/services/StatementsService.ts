/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StatementsResponse } from '../models/StatementsResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StatementsService {

    /**
     * Get a statement
     * Get a statement document using its identifier
     * @param clientId Unique client identifier.
     * @param id Statement identifier used to find the document.
     * @param token JWT Client token
     * @returns string Ok.
     * @throws ApiError
     */
    public static getStatement(
clientId: string,
id: string,
token?: string,
): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/statements/{id}',
            path: {
                'id': id,
            },
            headers: {
                'token': token,
                'client_id': clientId,
            },
            errors: {
                401: `Forbidden`,
                403: `Unauthorized`,
                404: `Service Unavailable`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

    /**
     * Search statements
     * Returns statements filtered by search criteria.
     * @param clientId Unique client identifier.
     * @param dateFrom Earliest date in search range. Must be set at least one day earlier than dateTo.
     * @param dateTo Latest date in search range. Must be set at least one day later than dateFrom.
     * @param token JWT Client token
     * @param accountIds Account identifiers used to represent client accounts.
 * 
     * @returns StatementsResponse Ok.
     * @throws ApiError
     */
    public static searchStatements(
clientId: string,
dateFrom: string,
dateTo: string,
token?: string,
accountIds?: Array<string>,
): CancelablePromise<StatementsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/statements/search',
            headers: {
                'token': token,
                'client_id': clientId,
            },
            query: {
                'accountIds': accountIds,
                'dateFrom': dateFrom,
                'dateTo': dateTo,
            },
            errors: {
                401: `Forbidden`,
                403: `Unauthorized`,
                404: `Service Unavailable`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

}
