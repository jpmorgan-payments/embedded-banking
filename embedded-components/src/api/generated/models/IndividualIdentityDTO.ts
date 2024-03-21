/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type IndividualIdentityDTO = {
    /**
     * Description of the ID.
     */
    description?: string;
    expiryDate?: string;
    /**
     * `idType` denotes the type of taxpayer identification number (e.g. Social Security Number or Individual Taxpayer Identification Number). A Social Security Number or Individual Taxpayer Identification Number is accepted for an owner or controller individual. Decision makers do not require any tax identifier.
 * 
     */
    idType: IndividualIdentityDTO.idType;
    /**
     * Identification issuer country code e.g. US
     */
    issuer: string;
    /**
     * Value of the identification type. EIN/SSN/ITIN must be of 9 digits.
     */
    value: string;
};

export namespace IndividualIdentityDTO {

    /**
     * `idType` denotes the type of taxpayer identification number (e.g. Social Security Number or Individual Taxpayer Identification Number). A Social Security Number or Individual Taxpayer Identification Number is accepted for an owner or controller individual. Decision makers do not require any tax identifier.
 * 
     */
    export enum idType {
        SSN = 'SSN',
        ITIN = 'ITIN',
    }


}
