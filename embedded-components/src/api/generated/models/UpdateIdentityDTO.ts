/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateIdentityDTO = {
    /**
     * IdType denotes the type of taxpayer identification numbers e.g. SSN/EIN. EIN is acceptable idType for Privately Owned Business. Sole Proprietorship can have EIN/SSN as idType. For individuals like Owners and Controllers SSN is accepted as idType.
 * 
     */
    idType: string;
    /**
     * Description of identification type e.g. Social Security Number
     */
    idDescription?: string;
    /**
     * Identification issuer country name e.g. US
     */
    idIssuer: string;
    /**
     * Value of the identification type. EIN/SSN must be of 9 digits.
     */
    idValue: string;
    /**
     * The action like ADD, UPDATE, REMOVE
 * 
     */
    action: string;
};
