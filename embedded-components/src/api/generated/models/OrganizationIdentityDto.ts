/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The tax ID of the organization.
 */
export type OrganizationIdentityDto = {
    /**
     * Description of the ID.
     */
    description?: string;
    /**
     * The ID type
     */
    idType: OrganizationIdentityDto.idType;
    /**
     * ID value
     */
    value: string;
    /**
     * Issuing authority
     */
    issuer: string;
    expiryDate?: string;
};

export namespace OrganizationIdentityDto {

    /**
     * The ID type
     */
    export enum idType {
        EIN = 'EIN',
        BUSINESS_REGISTRATION_ID = 'BUSINESS_REGISTRATION_ID',
    }


}
