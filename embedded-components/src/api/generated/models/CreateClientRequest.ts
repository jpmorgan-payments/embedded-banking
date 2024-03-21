/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EntityDetailBusinessRequest } from './EntityDetailBusinessRequest';
import type { RelatedPartiesRequest } from './RelatedPartiesRequest';

export type CreateClientRequest = (EntityDetailBusinessRequest & {
relatedParties: Array<RelatedPartiesRequest>;
/**
 * The products available for clients in a jurisdiction.
 * 
 */
products: Array<string>;
/**
 * The jurisdiction where the client would be onboarding.
 * 
 */
jurisdiction?: string;
});
