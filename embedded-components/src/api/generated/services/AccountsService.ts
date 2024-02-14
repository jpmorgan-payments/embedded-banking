/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountBalanceResponse } from '../models/AccountBalanceResponse';
import type { AccountResponseWithStatus } from '../models/AccountResponseWithStatus';
import type { CreateAccountRequest } from '../models/CreateAccountRequest';
import type { ListAccountsResponse } from '../models/ListAccountsResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AccountsService {

    /**
     * List accounts
     * Returns a list of accounts for a specific client.
     * @param token JWT Client token
     * @param clientId Unique client identifier
     * @param limit Number of records per page.
     * @param page Page Number
     * @returns ListAccountsResponse List of accounts for a specific client
     * @throws ApiError
     */
    public static getAccounts(
token?: string,
clientId?: string,
limit: number = 25,
page?: number,
): CancelablePromise<ListAccountsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/accounts',
            headers: {
                'token': token,
            },
            query: {
                'clientId': clientId,
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
     * Create account
     * Create an account for a specific client
     * @param requestBody 
     * @param token JWT Client token
     * @returns AccountResponseWithStatus Account created successfully
     * @throws ApiError
     */
    public static postAccounts(
requestBody: CreateAccountRequest,
token?: string,
): CancelablePromise<AccountResponseWithStatus> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/v1/accounts',
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
     * Get account
     * Look up a single account by account ID
     * @param id Unique account identifier
     * @param token JWT Client token
     * @returns AccountResponseWithStatus Account details
     * @throws ApiError
     */
    public static getAccount(
id: string,
token?: string,
): CancelablePromise<AccountResponseWithStatus> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/accounts/{id}',
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
     * Get an account balance
     * Get the balance details for an account
     * @param id Unique account identifier
     * @param token JWT Client token
     * @returns AccountBalanceResponse Account balance details
     * @throws ApiError
     */
    public static getAccountBalance(
id: string,
token?: string,
): CancelablePromise<AccountBalanceResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/accounts/{id}/balances',
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

}
