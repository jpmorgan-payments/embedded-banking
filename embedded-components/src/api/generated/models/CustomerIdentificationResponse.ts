/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CustomerIdentificationResponse = {
    /**
     * If the status is present in the response, CIP has been performed
     */
    customerIdentificationStatus: CustomerIdentificationResponse.customerIdentificationStatus;
};

export namespace CustomerIdentificationResponse {

    /**
     * If the status is present in the response, CIP has been performed
     */
    export enum customerIdentificationStatus {
        CIP_PASSED = 'CIP_PASSED',
        CIP_FAILED = 'CIP_FAILED',
        CIP_PENDING_VERIFICATION = 'CIP_PENDING_VERIFICATION',
    }


}
