/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserRequest } from '../models/CreateUserRequest';
import type { ListUserResponse } from '../models/ListUserResponse';
import type { UpdateUserRequest } from '../models/UpdateUserRequest';
import type { UserResponse } from '../models/UserResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * List users
     * Retrieves list of users for a client. The API by default retrieves a lighter version of data.
     * @param token JWT Client token
     * @param limit Number of records per page.
     * @param page Page Number
     * @returns ListUserResponse Ok.
     * @throws ApiError
     */
    public static getAllUsers(
token?: string,
limit: number = 25,
page?: number,
): CancelablePromise<ListUserResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/users',
            headers: {
                'token': token,
            },
            query: {
                'limit': limit,
                'page': page,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal Server Error - Generic Error`,
                503: `Service Unavailable - API Processing Error`,
            },
        });
    }

    /**
     * Create user
     * Creates a new user. This API is developed to enable clients to create a user for accessing and managing resources for that client. The payload has a property partyId. This partyId is used to add an existing party as a user. Phone field is optional when partyId is provided. When partyId is not provided, then phone field should be populated. When providing a role, if the role is a DEBIT_CARD_HOLDER then the resourceType and resourceId and action should be provided.
     * @param token JWT Client token
     * @param requestBody 
     * @returns UserResponse Created.
     * @throws ApiError
     */
    public static postUsers(
token?: string,
requestBody?: CreateUserRequest,
): CancelablePromise<UserResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/v1/users',
            headers: {
                'token': token,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal Server Error - Generic Error`,
                503: `Service Unavailable - API Processing Error`,
            },
        });
    }

    /**
     * Get user
     * Retrieves details for a specific user.
     * @param id Identifier of the user record.
     * @param token JWT Client token
     * @returns UserResponse Ok.
     * @throws ApiError
     */
    public static getUserDetails(
id: string,
token?: string,
): CancelablePromise<UserResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/users/{id}',
            path: {
                'id': id,
            },
            headers: {
                'token': token,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `No data found for the criteria specified`,
                500: `Internal Server Error - Generic Error`,
                503: `Service Unavailable - API Processing Error`,
            },
        });
    }

    /**
     * Update user
     * Updates information about user. For additional users only, full details like name, email, address phone and role can be updated.
     * @param id Identifier of the user record.
     * @param token JWT Client token
     * @param requestBody 
     * @returns UserResponse OK
     * @throws ApiError
     */
    public static updateUserById(
id: string,
token?: string,
requestBody?: UpdateUserRequest,
): CancelablePromise<UserResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/v1/users/{id}',
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
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal Server Error - Generic Error`,
                503: `Service Unavailable - API Processing Error`,
            },
        });
    }

}
