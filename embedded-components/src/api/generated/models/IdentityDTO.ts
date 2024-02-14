/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type IdentityDTO = {
    /**
     * IdType denotes the type of taxpayer identification numbers e.g. SSN/EIN/ITIN. EIN is acceptable idType for Privately Owned Business. Sole Proprietorship can have EIN/SSN/ITIN as idType. For individuals like Owners and Controllers SSN/ITIN is accepted as idType. Decision Makers do not require any tax identifier.
 * 
     */
    idType: string;
    /**
     * Description of identification type e.g. Social Security Number
     */
    idDescription?: string;
    /**
     * Identification issuer country code e.g. US
     */
    idIssuer: string;
    /**
     * Value of the identification type. EIN/SSN/ITIN must be of 9 digits.
     */
    idValue: string;
};
