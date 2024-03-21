/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * An Object containing Card Update Request
 * 
 */
export type CardUpdateRequest = {
    /**
     * 4 digit ATM pin to be used for associated card.
 * Optional field. Only include if setting a new PIN.
 * 
     */
    pin?: string;
    /**
     * New status of the card after request. Can be locked/unlocked/replaced/cancelled status.
 * Optional field. Only use if you want to update the status of the card.
 * 
     */
    status?: CardUpdateRequest.status;
    /**
     * Reason for replacing card. Only required if status is set to REPLACED.
 * 
     */
    replacementReason?: CardUpdateRequest.replacementReason;
    /**
     * Reason for cancelling card. Only required if status is set to CANCELLED.
 * 
     */
    cancellingReason?: CardUpdateRequest.cancellingReason;
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
    /**
     * Clears spending limits on this card. Set value to TRUE to remove any daily spending limits. If set to TRUE, any maxSpendLimit limit is ignored. You can still apply daily cash withdrawal limits  even when clearSpendLimit is set to TRUE.
 * 
     */
    clearSpendLimit?: boolean;
    /**
     * Clears daily cashwithdrawal limits on this card. Set value to TRUE to remove any daily cashwithdrawal limits. If set to TRUE, any maxCashWithdrawalLimit limit is ignored. You can still apply daily spend limits even when clearCashWithdrawalLimit is set to TRUE.
 * 
     */
    clearCashWithdrawalLimit?: boolean;
};

export namespace CardUpdateRequest {

    /**
     * New status of the card after request. Can be locked/unlocked/replaced/cancelled status.
 * Optional field. Only use if you want to update the status of the card.
 * 
     */
    export enum status {
        LOCKED = 'LOCKED',
        UNLOCKED = 'UNLOCKED',
        REPLACED = 'REPLACED',
        CANCELLED = 'CANCELLED',
    }

    /**
     * Reason for replacing card. Only required if status is set to REPLACED.
 * 
     */
    export enum replacementReason {
        LOST = 'LOST',
        STOLEN = 'STOLEN',
        DAMAGED = 'DAMAGED',
        DEFECTIVE = 'DEFECTIVE',
    }

    /**
     * Reason for cancelling card. Only required if status is set to CANCELLED.
 * 
     */
    export enum cancellingReason {
        LOST = 'LOST',
        STOLEN = 'STOLEN',
        DEACTIVE = 'DEACTIVE',
    }


}
