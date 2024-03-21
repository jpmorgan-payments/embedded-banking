/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CaseUpdateRequest = {
    /**
     * The status you want the case to have as a result of this request. To close a case, use CLOSED. To reopen a case, use REOPEN.
     */
    status?: CaseUpdateRequest.status;
    /**
     * A comment on the case. Can be the reason for updating the status of a case.
     */
    comment: string;
};

export namespace CaseUpdateRequest {

    /**
     * The status you want the case to have as a result of this request. To close a case, use CLOSED. To reopen a case, use REOPEN.
     */
    export enum status {
        CLOSED = 'CLOSED',
        REOPEN = 'REOPEN',
    }


}
