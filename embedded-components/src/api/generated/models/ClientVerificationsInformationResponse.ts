/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdditionalDocuments } from './AdditionalDocuments';
import type { AttestationsResponse } from './AttestationsResponse';
import type { VerificationsResponse } from './VerificationsResponse';

export type ClientVerificationsInformationResponse = {
    /**
     * If the status is present in the response, verifications are submitted for the client
     */
    status?: string;
    verifications?: Array<VerificationsResponse>;
    attestations?: Array<AttestationsResponse>;
    additionalDocuments?: Array<AdditionalDocuments>;
};
