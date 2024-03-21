/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * An object containing the status of a submitted image of a check.
 * 
 */
export type CheckImageStatus = {
    front?: CheckImageStatus.front;
    back?: CheckImageStatus.back;
};

export namespace CheckImageStatus {

    export enum front {
        ACCEPTED = 'ACCEPTED',
        REJECTED = 'REJECTED',
        NOT_SUBMITTED = 'NOT_SUBMITTED',
    }

    export enum back {
        ACCEPTED = 'ACCEPTED',
        REJECTED = 'REJECTED',
        NOT_SUBMITTED = 'NOT_SUBMITTED',
    }


}
