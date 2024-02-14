/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ApiErrorReasonV2 = {
    /**
     * Short code that identifies the error - publicly cataloged and documented
     */
    code?: string;
    /**
     * Part of the request which is responsible for the reason
     */
    location?: ApiErrorReasonV2.location;
    /**
     * The location of the property or parameter in error
     */
    field?: string;
    /**
     * Message describing the reason. This message can typically be displayed to your platform's users, except in cases specified otherwise
     */
    message: string;
};

export namespace ApiErrorReasonV2 {

    /**
     * Part of the request which is responsible for the reason
     */
    export enum location {
        BODY = 'BODY',
        QUERY = 'QUERY',
        PATH = 'PATH',
        HEADER = 'HEADER',
    }


}
