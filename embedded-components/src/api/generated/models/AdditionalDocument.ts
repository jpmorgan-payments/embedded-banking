/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AdditionalDocument = {
    /**
     * Related Party id
     */
    partyId?: string;
    /**
     * Status of the document. REQUESTED means the document needs to be provided
     */
    status?: string;
    /**
     * Identity documents level - The category of document which is predefined. Primary is one of the categories and has some limited set of applicable documents.
     */
    documentLevel?: string;
    /**
     * Unique identifier of the document which user uploaded
     */
    documentId?: string;
    /**
     * Specifies the party type, for Legal Entity it is Organization and for Related party e.g. Owner/Controller etc. it is Individual
     */
    partyType?: string;
    /**
     * Specifies number of days remaining to upload documents 
     */
    numberOfDaysRemainingToUpload?: string;
    /**
     * Specifies type of the document uploaded
     */
    documentType?: string;
    supportedDocuments?: Array<string>;
};
