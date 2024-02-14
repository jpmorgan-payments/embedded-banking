/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * - Additional information about the document in a key-value pair array.
 * - The processing domain should only support the specific keys for thier relevant workflows.
 * - The productType and documentType combination will determine the
 * list of allowed meta-data keys and the format of their values.
 * - For productype = EB and documentType = ( PASSPORT | SSN_CARD | DRIVERS_LICENSE | GOV_ISSUED_ID_CARD ),
 *
 * Mandatory meta-data key list = ["partyId"] and allowed meta-data value format = ["uuid"].
 *
 * Example - {"key": "partyId", "value": "73bd1c1d-6635-43ff-a8e5-b252926bdd9e"} .
 * 
 */
export type DocumentMetadata = {
    /**
     * Key value can be PARTY_ID or COUNTRY_CODE
     */
    key: DocumentMetadata.key;
    /**
     * value can be UUID which represents a partyId or a ISO two characters country code e.g. US
     */
    value: string;
};

export namespace DocumentMetadata {

    /**
     * Key value can be PARTY_ID or COUNTRY_CODE
     */
    export enum key {
        PARTY_ID = 'PARTY_ID',
        COUNTRY_CODE = 'COUNTRY_CODE',
    }


}
