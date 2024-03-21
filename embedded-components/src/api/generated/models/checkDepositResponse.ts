/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CheckImageStatus } from './CheckImageStatus';

/**
 * An object containing the response to a check deposit request.
 * 
 */
export type checkDepositResponse = {
    /**
     * A unique identifier for the check.
 * 
     */
    id?: string;
    /**
     * Date the check was submitted.
 * 
     */
    createdAt?: string;
    /**
     * Financial value (amount of money) of the check deposit.
 * 
     */
    amount?: number;
    /**
     * The currency of the check, in three-character ISO currency code.
 * 
     */
    currency?: string;
    /**
     * A message or description of the check for the end user's reference.
 * 
     */
    memo?: string;
    status?: checkDepositResponse.status;
    /**
     * Account identifier of the creditor (the party being paid). This should match the Embedded Banking account into which the funds will be transferred.
 * 
     */
    creditorAccount?: string;
    /**
     * Account identifier of the debtor (the party making the payment).
 * 
     */
    debtorAccount?: string;
    /**
     * The name of the debtor (the party making the payment).
 * 
     */
    debtorName?: string;
    /**
     * Debtor ABA (American Bankers Association) Routing Number.
 * 
     */
    debtorABA?: string;
    checkImageStatus?: CheckImageStatus;
};

export namespace checkDepositResponse {

    export enum status {
        PENDING = 'PENDING',
        CANCELLED = 'CANCELLED',
        COMPLETE = 'COMPLETE',
    }


}
