/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApiErrorReasonV2 } from './ApiErrorReasonV2';

export type ApiErrorV2 = {
    /**
     * Short humanly-readable title of the error
     */
    title: string;
    /**
     * HTTP status code
     */
    httpStatus?: number;
    /**
     * Internal assigned traced identifier
     */
    traceId?: string;
    /**
     * Client provided request identifier
     */
    requestId?: string;
    /**
     * Provides additional context and detail on the validation errors
     */
    context?: Array<ApiErrorReasonV2>;
};
