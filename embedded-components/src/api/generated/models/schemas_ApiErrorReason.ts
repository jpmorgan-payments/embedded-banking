/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type schemas_ApiErrorReason = {
    /**
     * Readable reason returned to indicate a reason behind the error occurred
     */
    reason: string;
    /**
     * Part of the request which is responsible for the reason
     */
    field?: string;
    /**
     * Rejected value from the request which is responsible for the reason
     */
    rejectedValue?: string;
    /**
     * Message describing the reason. This message can typically be displayed to your platform's users, except in cases specified otherwise
     */
    message: string;
};
