/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CardAddress } from './CardAddress';
import type { Contact } from './Contact';
import type { GovernmentId } from './GovernmentId';

/**
 * An Object containing Create Debit Card Request
 * 
 */
export type CreateDebitCardRequest = {
    /**
     * Account Identifier/ Payment Routing Number
 * 
     */
    accountId?: string;
    /**
     * Party Id of the Card Holder
 * 
     */
    relatedPartyId?: string;
    /**
     * First Name of the Cardholder provided during Onboarding.
 * 
     */
    firstName?: string;
    /**
     * Middle Name of the Cardholder provided during Onboarding.
 * 
     */
    middleName?: string;
    /**
     * Last Name of the Cardholder provided during Onboarding.
 * 
     */
    lastName?: string;
    /**
     * Date of birth of the Cardholder provided during Onboarding
 * 
     */
    birthDate?: string;
    /**
     * Citizenship of the Cardholder.
 * 
     */
    citizenshipCountry?: string;
    /**
     * Email Address of the Cardholder used for communication of New Cards, Card Updates & Other Lifecycle Events.
 * 
     */
    email?: string;
    mobilePhone?: Contact;
    mailingAddress?: CardAddress;
    governmentId?: GovernmentId;
    /**
     * The maximum total amount that can be spent in a single day. Resets at 00:00 each day.
 * 
     */
    maxSpendLimit?: number;
    /**
     * The total amount of cash that can be withdrawn in a single day. Resets at 00:00 each day.
 * 
     */
    maxCashWithdrawalLimit?: number;
};
