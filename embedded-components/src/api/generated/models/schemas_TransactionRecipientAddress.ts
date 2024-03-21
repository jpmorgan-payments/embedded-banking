/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CountryCode } from './CountryCode';

/**
 * Recipient's postal address
 * Mandatory for payment types WIRE, RTP
 * 
 */
export type schemas_TransactionRecipientAddress = {
    /**
     * First line of the recipient's postal address
 * For payment type WIRE addressLine1 cannot exceed 35 characters
 * For payment type RTP addressLine1 cannot exceed 70 characters
 * 
     */
    addressLine1: string;
    /**
     * Second line of the recipient's postal address
     */
    addressLine2?: string;
    /**
     * Third line of the recipient's postal address
     */
    addressLine3?: string;
    /**
     * City of the recipient's postal address
 * For payment type WIRE city and state combined cannot exceed 35 characters
 * 
     */
    city: string;
    countryCode: CountryCode;
    /**
     * State of the recipient's postal address
 * For payment type WIRE city and state combined cannot exceed 35 characters
 * 
     */
    state: string;
    /**
     * Zip code of the recipient's postal address
     */
    zip: string;
};
