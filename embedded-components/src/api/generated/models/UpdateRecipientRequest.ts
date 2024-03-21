/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RecipientAccount } from './RecipientAccount';
import type { RecipientPartyDetails } from './RecipientPartyDetails';
import type { RecipientStatus } from './RecipientStatus';

export type UpdateRecipientRequest = {
    partyDetails?: RecipientPartyDetails;
    status?: RecipientStatus;
    account?: RecipientAccount;
};
