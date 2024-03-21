/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreatePartyRequestInline } from './CreatePartyRequestInline';
import type { PartyTypeSmbdo } from './PartyTypeSmbdo';
import type { schemas_Role } from './schemas_Role';

/**
 * Create a party within the clients payload.
 */
export type CreatePartyRequestInlineRequired = (CreatePartyRequestInline & {
partyType: PartyTypeSmbdo;
roles: Array<schemas_Role>;
});
