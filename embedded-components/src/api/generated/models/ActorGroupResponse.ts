/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PupeeRoleResponse } from './PupeeRoleResponse';

export type ActorGroupResponse = {
    /**
     * Id of the actorGroup
     */
    id?: string;
    product?: string;
    name?: string;
    partySource?: string;
    party?: string;
    counterPartySource?: string;
    counterParty?: string;
    validFrom?: string;
    validUntil?: string;
    environment?: string;
    roles?: Array<PupeeRoleResponse>;
};
