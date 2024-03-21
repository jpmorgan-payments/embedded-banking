/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CardDetailsErrorResponse = {
    /**
     * Freeform explanatory text for the error.
 * 
     */
    errorDescription: string;
    /**
     * A code defined by the API provider that describes the specific error for a given API. This code provides more fine grained information than the httpStatusCode. As an example if an API provides an httpStatusCode of 400 they may also include the serviceErrorCode that includes more specific information of what caused a 400 response. (i.e. INVALID_EMAIL, INVALID_PHONE_NUMBER, etc)
 * 
     */
    serviceErrorCode?: string;
    /**
     * A code defined by the service for the external partner that includes a more specific information of what caused the error.
 * 
     */
    externalErrorCode?: string;
};
