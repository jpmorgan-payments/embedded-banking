/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AttestationResponse = {
    /**
     *  First and last name of the attester.
     */
    fullName?: string;
    /**
     *  Attested IP address
     */
    ipAddress?: string;
    /**
     * date time of submission in ISO format yyyy-MM-ddTHH:mm:ss
     */
    attestationDateTime?: string;
    /**
     * The type of document. Can be terms and conditions or disclosure and consent documents.
     */
    documentType?: string;
    /**
     * Unique identifier of the legal document that must be attested by the user. For example, terms & conditions or disclosure & consent documents.
     */
    documentId?: string;
    /**
     * Document version
     */
    documentVersion?: string;
    /**
     * Name of the document
     */
    documentName?: string;
};
