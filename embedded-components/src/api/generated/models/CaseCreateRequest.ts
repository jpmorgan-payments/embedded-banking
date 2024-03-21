/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CaseCreateRequest = {
    /**
     * Case category
     */
    type: CaseCreateRequest.type;
    /**
     * Subject of a Case
     */
    subject: string;
    /**
     * More detailed description of the Case
     */
    description: string;
};

export namespace CaseCreateRequest {

    /**
     * Case category
     */
    export enum type {
        ACCOUNT = 'ACCOUNT',
        CARD = 'CARD',
        ENROLLMENT_OR_SIGNUP = 'ENROLLMENT_OR_SIGNUP',
        PROFILE = 'PROFILE',
        STATEMENT = 'STATEMENT',
        SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
        TRANSACTION = 'TRANSACTION',
        OTHER = 'OTHER',
    }


}
