/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FAQResponse } from '../models/FAQResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FaqService {

    /**
     * API to retrieve general FAQ content as well as C1 specific FAQ content
     * Retrieve FAQs
     * @param clientId Unique Client identifier
     * @param token JWT Client token
     * @param tags Comma seperated tag values
     * @returns FAQResponse Ok.
     * @throws ApiError
     */
    public static getFaq(
clientId?: string,
token?: string,
tags?: Array<string>,
): CancelablePromise<FAQResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/faqs',
            headers: {
                'token': token,
            },
            query: {
                'clientId': clientId,
                'tags': tags,
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
