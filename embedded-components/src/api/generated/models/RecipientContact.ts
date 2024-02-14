/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RecipientContact = {
    /**
     * Type of contact information being provided
     */
    contactType: RecipientContact.contactType;
    /**
     * E.164 format compatible telephone country code
 * Mandatory for contactType PHONE
 * 
     */
    countryCode?: string;
    /**
     * Contact information corresponding to contactType:
 * PHONE - E.164-compliant telephone number (excluding country code).
 * EMAIL - Email address (addr-spec in Section 3.4 of RFC 5322).
 * WEBSITE - URL starting with http:// or https://.
 * 
     */
    value: string;
};

export namespace RecipientContact {

    /**
     * Type of contact information being provided
     */
    export enum contactType {
        EMAIL = 'EMAIL',
        WEBSITE = 'WEBSITE',
        PHONE = 'PHONE',
    }


}
