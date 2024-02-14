/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RecipientAccount } from './RecipientAccount';
import type { RecipientPartyDetails } from './RecipientPartyDetails';
import type { RecipientType } from './RecipientType';

export type RecipientRequest = {
    partyDetails?: RecipientPartyDetails;
    /**
     * Related Party Identifier for Linked Accounts
     */
    partyId?: string;
    account: RecipientAccount;
    type?: RecipientType;
    /**
     * Client identifier
     */
    clientId?: string;
};
