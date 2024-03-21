/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ActorGroupResponse } from './ActorGroupResponse';
import type { PupeeRoleResponse } from './PupeeRoleResponse';

export type OrganisationResponse = {
    /**
     * C1 Id
     */
    platformId?: string;
    /**
     * C2 Id
     */
    clientId?: string;
    roles?: Array<PupeeRoleResponse>;
    actorGroups?: Array<ActorGroupResponse>;
};
