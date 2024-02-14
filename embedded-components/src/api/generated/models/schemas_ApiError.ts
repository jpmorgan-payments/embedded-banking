/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { schemas_ApiErrorReason } from './schemas_ApiErrorReason';

export type schemas_ApiError = {
    /**
     * Readable code returned to indicate an error occurred
     */
    error: string;
    /**
     * Message describing the error. This message can typically be displayed to your platform's users, except in cases specified otherwise
     */
    message: string;
    reasons?: Array<schemas_ApiErrorReason>;
};
