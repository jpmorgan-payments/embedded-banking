/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CountryCodeIsoAlpha2 } from './CountryCodeIsoAlpha2';
import type { ExternalId } from './ExternalId';
import type { Name } from './Name';
import type { ParentPartyId } from './ParentPartyId';
import type { PartyId } from './PartyId';
import type { PartyStatus } from './PartyStatus';
import type { PartyTypeSmbdo } from './PartyTypeSmbdo';
import type { ProfileStatus } from './ProfileStatus';
import type { schemas_Role } from './schemas_Role';

export type PartySummaryResponse = {
    country?: CountryCodeIsoAlpha2;
    createdAt?: string;
    externalId?: ExternalId;
    id?: PartyId;
    parentPartyId?: ParentPartyId;
    partyType?: PartyTypeSmbdo;
    profileStatus?: ProfileStatus;
    name?: Name;
    roles?: Array<schemas_Role>;
    status?: PartyStatus;
};
