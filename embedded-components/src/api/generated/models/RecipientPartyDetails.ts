/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PartyType } from './PartyType';
import type { RecipientAddress } from './RecipientAddress';
import type { RecipientContact } from './RecipientContact';

export type RecipientPartyDetails = {
    /**
     * Address details for the recipient. Mandatory for payments using the RTP payment type.
     */
    address?: RecipientAddress;
    type: PartyType;
    /**
     * Recipient's first name. Mandatory for recipient type INDIVIDUAL.
 * 
     */
    firstName?: string;
    /**
     * Recipient's last name. Mandatory for recipient type INDIVIDUAL.
 * 
     */
    lastName?: string;
    /**
     * Recipient company name. Mandatory for recipient type ORGANIZATION.
 * 
     */
    businessName?: string;
    /**
     * Contact details for the recipient.
     */
    contacts?: Array<RecipientContact>;
};
