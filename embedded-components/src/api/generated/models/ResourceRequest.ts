/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Action } from './Action';
import type { CreateOrganisationRequest } from './CreateOrganisationRequest';

export type ResourceRequest = (CreateOrganisationRequest & {
/**
 * Name of the service
 */
service?: string;
/**
 * ResourceId
 */
resourceId?: string;
resourceType?: string;
action?: Action;
});
