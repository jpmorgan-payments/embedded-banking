/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AttestationRequest = {
    /**
     *  First and last name of the attester.
     */
    fullName: string;
    /**
     *  Attested IP address
     */
    ipAddress: string;
    /**
     * Unique identifier of the legal document that must be attested by the user. For example, terms & conditions or disclosure & consent documents.
     */
    documentId: string;
};
