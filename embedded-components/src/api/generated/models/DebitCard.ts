/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DebitCard = {
    /**
     * Unique identifier for the card.
     */
    id: string;
    /**
     * Account identifier or payment routing number.
     */
    accountId: string;
    /**
     * First name of the client.
     */
    firstName: string;
    /**
     * Middle name of the client.
     */
    middleName: string;
    /**
     * Last name of the client.
     */
    lastName: string;
    /**
     * Last Four digits of the card number.
     */
    last4: string;
    /**
     * Card expiration date.
     */
    expirationDate: string;
    /**
     * The current status of the card.
     */
    status: DebitCard.status;
    /**
     * The maximum total amount that can be spent in a single day. Resets at 00:00 each day.
     */
    maxSpendLimit?: number;
    /**
     * The total amount of cash that can be withdrawn in a single day. Resets at 00:00 each day.
     */
    maxCashWithdrawalLimit?: number;
};

export namespace DebitCard {

    /**
     * The current status of the card.
     */
    export enum status {
        ACTIVE = 'ACTIVE',
        INACTIVE = 'INACTIVE',
        SUSPEND = 'SUSPEND',
        DAMAGED = 'DAMAGED',
        DEACTIVE = 'DEACTIVE',
        DEFECTIVE = 'DEFECTIVE',
        LOST = 'LOST',
        STOLEN = 'STOLEN',
        UNDELIVER = 'UNDELIVER',
        IRREGACT = 'IRREGACT',
    }


}
