/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RecipientAccount } from './RecipientAccount';
import type { RecipientPartyDetails } from './RecipientPartyDetails';
import type { RecipientStatus } from './RecipientStatus';
import type { RecipientType } from './RecipientType';
import type { UserId } from './UserId';

export type Recipient = {
    id: string;
    partyDetails: RecipientPartyDetails;
    /**
     * Related Party Identifier for Linked Accounts
     */
    partyId?: string;
    account: RecipientAccount;
    type?: RecipientType;
    status?: RecipientStatus;
    userId?: UserId;
    /**
     * Client identifier
     */
    clientId?: string;
    /**
     * The date and time the recipient was created
     */
    createdAt?: string;
    /**
     * The date and time the recipient was last updated
     */
    updatedAt?: string;
};
