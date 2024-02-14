/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccessList } from './AccessList';
import type { Email } from './Email';
import type { IndividualDetails } from './IndividualDetails';
import type { OrganizationDetails } from './OrganizationDetails';
import type { PartyId } from './PartyId';
import type { schemas_Role } from './schemas_Role';

/**
 * Update a party inline within the clients API by supplying its ID.
 */
export type UpdatePartyRequestInline = {
    access?: AccessList;
    id?: PartyId;
    email?: Email;
    roles?: Array<schemas_Role>;
    individualDetails?: IndividualDetails;
    organizationDetails?: OrganizationDetails;
};
