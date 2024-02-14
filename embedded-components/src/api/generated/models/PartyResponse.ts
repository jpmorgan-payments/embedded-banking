/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccessList } from './AccessList';
import type { Email } from './Email';
import type { ExternalId } from './ExternalId';
import type { IndividualDetails } from './IndividualDetails';
import type { OrganizationDetails } from './OrganizationDetails';
import type { ParentPartyId } from './ParentPartyId';
import type { PartyId } from './PartyId';
import type { PartyStatus } from './PartyStatus';
import type { PartyTypeSmbdo } from './PartyTypeSmbdo';
import type { ProfileStatus } from './ProfileStatus';
import type { schemas_Role } from './schemas_Role';
import type { ValidationResponse } from './ValidationResponse';

export type PartyResponse = {
    access?: AccessList;
    id?: PartyId;
    createdAt?: string;
    email?: Email;
    externalId?: ExternalId;
    partyType?: PartyTypeSmbdo;
    parentPartyId?: ParentPartyId;
    parentExternalId?: ExternalId;
    profileStatus?: ProfileStatus;
    roles?: Array<schemas_Role>;
    status?: PartyStatus;
    validationResponse?: ValidationResponse;
    individualDetails?: IndividualDetails;
    organizationDetails?: OrganizationDetails;
};
