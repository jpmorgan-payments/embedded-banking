/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionListResponse } from '../models/QuestionListResponse';
import type { schemas_QuestionResponse } from '../models/schemas_QuestionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuestionsService {

    /**
     * List questions
     * Lists customer due diligence questions.
 * 
     * @param token JWT Client token
     * @param questionIds Comma-separated list of Question IDs.
     * @returns QuestionListResponse Ok.
     * @throws ApiError
     */
    public static smbdoListQuestions(
token?: string,
questionIds?: string,
): CancelablePromise<QuestionListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/do/v1/questions',
            headers: {
                'token': token,
            },
            query: {
                'questionIds': questionIds,
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
     * Get question
     * Get a customer due diligence question.
 * 
     * @param id Unique Question identifier.
     * @param token JWT Client token
     * @returns schemas_QuestionResponse Ok.
     * @throws ApiError
     */
    public static smbdoGetQuestion(
id: string,
token?: string,
): CancelablePromise<schemas_QuestionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/do/v1/questions/{id}',
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
