/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccessList } from './AccessList';
import type { Email } from './Email';
import type { ExternalId } from './ExternalId';
import type { IndividualDetails } from './IndividualDetails';
import type { OrganizationDetails } from './OrganizationDetails';
import type { PartyStatus } from './PartyStatus';
import type { schemas_Role } from './schemas_Role';

export type UpdatePartyRequest = {
    access?: AccessList;
    email?: Email;
    externalId?: ExternalId;
    roles?: Array<schemas_Role>;
    status?: PartyStatus;
    individualDetails?: IndividualDetails;
    organizationDetails?: OrganizationDetails;
};
