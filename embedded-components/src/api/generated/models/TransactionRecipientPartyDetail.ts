/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PartyType } from './PartyType';
import type { RecipientContact } from './RecipientContact';
import type { TransactionRecipientAddress } from './TransactionRecipientAddress';

export type TransactionRecipientPartyDetail = {
    /**
     * Address details for the recipient
 * Mandatory for RTP and WIRE payment types
 * 
     */
    address?: TransactionRecipientAddress;
    type?: PartyType;
    /**
     * Recipient's first name
 * Mandatory for recipient type INDIVIDUAL
 * For payment type WIRE firstName and lastName combined cannot exceed 35 characters
 * 
     */
    firstName?: string;
    /**
     * Recipient's last name
 * Mandatory for recipient type INDIVIDUAL
 * For payment type WIRE firstName and lastName combined cannot exceed 35 characters
 * 
     */
    lastName?: string;
    /**
     * Recipient company name
 * Mandatory for recipient type ORGANIZATION
 * For payment type WIRE business name cannot exceed 35 characters
 * 
     */
    businessName?: string;
    contacts?: Array<RecipientContact>;
};
