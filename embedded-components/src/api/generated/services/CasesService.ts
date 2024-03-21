/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CaseCreateRequest } from '../models/CaseCreateRequest';
import type { CaseCreateResponse } from '../models/CaseCreateResponse';
import type { CaseDetails } from '../models/CaseDetails';
import type { CasesPaginationResponse } from '../models/CasesPaginationResponse';
import type { CaseUpdateRequest } from '../models/CaseUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CasesService {

    /**
     * Returns all cases for client profile.
     * Get cases for client profile
     * @param token JWT Client token
     * @param limit Number of records per page.
     * @param page Page Number
     * @returns CasesPaginationResponse Ok.
     * @throws ApiError
     */
    public static getCases(
token?: string,
limit?: number,
page?: number,
): CancelablePromise<CasesPaginationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/cases',
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
     * Create a new case
     * Raises a case for support with Embedded Finance.
     * @param requestBody Information needed to create a new case.
     * @param token JWT Client token
     * @returns CaseCreateResponse Created.
     * @throws ApiError
     */
    public static createCase(
requestBody: CaseCreateRequest,
token?: string,
): CancelablePromise<CaseCreateResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/v1/cases',
            headers: {
                'token': token,
            },
            body: requestBody,
            mediaType: 'application/json',
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
     * Returns details of a case using the unique case ID.
     * Get case details
     * @param id Case identifier
     * @param token JWT Client token
     * @returns CaseDetails Ok.
     * @throws ApiError
     */
    public static getCase(
id: string,
token?: string,
): CancelablePromise<CaseDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/cases/{id}',
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
     * Update information on a specific case.
     * Update case
     * @param id Case ID. The unique identifier for a case.
     * @param requestBody 
     * @param token JWT Client token
     * @returns CaseDetails Updated.
     * @throws ApiError
     */
    public static updateCase(
id: string,
requestBody: CaseUpdateRequest,
token?: string,
): CancelablePromise<CaseDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/v1/cases/{id}',
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
