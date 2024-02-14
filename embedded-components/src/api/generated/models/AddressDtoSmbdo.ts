/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AddressDtoSmbdo = {
    /**
     * Type of address.
     */
    addressType?: AddressDtoSmbdo.addressType;
    /**
     * The first line must not be a PO Box and must begin with a number. Each line has a maximum of 60 characters.
     */
    addressLines: Array<string>;
    /**
     * city has a maximum of 30 characters.
     */
    city: string;
    /**
     * State code in alpha-2 format. State is mandatory for countries like United States.
     */
    state?: string;
    /**
     * Postal/ZIP code.
     */
    postalCode: string;
    /**
     * Country code in alpha-2 format.
     */
    country: string;
};

export namespace AddressDtoSmbdo {

    /**
     * Type of address.
     */
    export enum addressType {
        LEGAL_ADDRESS = 'LEGAL_ADDRESS',
        MAILING_ADDRESS = 'MAILING_ADDRESS',
        BUSINESS_ADDRESS = 'BUSINESS_ADDRESS',
        RESIDENTIAL_ADDRESS = 'RESIDENTIAL_ADDRESS',
    }


}
