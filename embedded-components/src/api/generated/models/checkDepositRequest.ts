/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * An object containing the check deposit request.
 * 
 */
export type checkDepositRequest = {
    /**
     * Account Identifier/ Payment Routing Number.
 * 
     */
    accountId: string;
    /**
     * Financial value (amount of money) of the check deposit.
 * 
     */
    amount: number;
    /**
     * A message or description of the check for the end user's reference.
 * 
     */
    memo?: string;
    /**
     * The currency of the check, in three-character ISO currency code.
 * 
     */
    currency: string;
};
