/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Microdeposit verification outcome
 */
export type MicrodepositVerificationResponse = {
    status: MicrodepositVerificationResponse.status;
};

export namespace MicrodepositVerificationResponse {

    export enum status {
        VERIFIED = 'VERIFIED',
        FAILED = 'FAILED',
        FAILED_MAX_ATTEMPTS_EXCEEDED = 'FAILED_MAX_ATTEMPTS_EXCEEDED',
    }


}
