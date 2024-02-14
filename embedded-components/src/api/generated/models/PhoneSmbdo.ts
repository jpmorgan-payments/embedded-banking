/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Phone Number Information of the account
 * 
 */
export type PhoneSmbdo = {
    phoneType: PhoneSmbdo.phoneType;
    countryCode: string;
    phoneNumber: string;
};

export namespace PhoneSmbdo {

    export enum phoneType {
        BUSINESS_PHONE = 'BUSINESS_PHONE',
        MOBILE_PHONE = 'MOBILE_PHONE',
        ALTERNATE_PHONE = 'ALTERNATE_PHONE',
    }


}
