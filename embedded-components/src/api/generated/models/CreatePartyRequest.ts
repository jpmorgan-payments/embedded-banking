/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccessList } from './AccessList';
import type { Email } from './Email';
import type { ExternalId } from './ExternalId';
import type { IndividualDetailsRequired } from './IndividualDetailsRequired';
import type { OrganizationDetailsRequired } from './OrganizationDetailsRequired';
import type { ParentPartyId } from './ParentPartyId';
import type { PartyTypeSmbdo } from './PartyTypeSmbdo';
import type { schemas_Role } from './schemas_Role';

export type CreatePartyRequest = {
    access?: AccessList;
    email?: Email;
    externalId?: ExternalId;
    parentPartyId?: ParentPartyId;
    parentExternalId?: ExternalId;
    partyType: PartyTypeSmbdo;
    roles: Array<schemas_Role>;
    individualDetails?: IndividualDetailsRequired;
    organizationDetails?: OrganizationDetailsRequired;
};
