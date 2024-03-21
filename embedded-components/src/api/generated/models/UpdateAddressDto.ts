/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateAddressDto = {
    /**
     * Type of address e.g. 'Primary Residence' | 'Principle Place Of Business'.
     */
    addressType?: string;
    /**
     * addressLine1 must not be a PO Box and must begin with a number.addressLine1 has a maximum of 60 characters.
     */
    addressLine1?: string;
    /**
     * addressLine2 has a maximum of 60 characters.This field can be set to empty by passing field value as ("") in request.
     */
    addressLine2?: string;
    /**
     * addressLine3 has a maximum of 60 characters.This field can be set to empty by passing field value as ("") in request.
     */
    addressLine3?: string;
    /**
     * city has a maximum of 30 characters.
     */
    city?: string;
    /**
     * State code in alpha-2 format. State is mandatory for countries like United States.
     */
    state?: string;
    /**
     * Postal/ZIP code.
     */
    postalCode?: string;
    /**
     * Country code in alpha-2 format.
     */
    countryCode?: string;
};
