/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListRoleResponse } from '../models/ListRoleResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RolesService {

    /**
     * List all roles
     * Retrieves a list of roles
     * @param token JWT Client token
     * @param limit Number of records per page.
     * @param page Page Number
     * @param roleName Role id
     * @returns ListRoleResponse Ok.
     * @throws ApiError
     */
    public static getAllRoles(
token?: string,
limit: number = 25,
page?: number,
roleName?: string,
): CancelablePromise<ListRoleResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/roles',
            headers: {
                'token': token,
            },
            query: {
                'limit': limit,
                'page': page,
                'role_name': roleName,
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

}
