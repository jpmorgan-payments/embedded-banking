/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PartyDetailBusiness } from './PartyDetailBusiness';
import type { ProfileConfiguration } from './ProfileConfiguration';
import type { RelatedPartyResponse } from './RelatedPartyResponse';

export type ClientInformationResponse = (PartyDetailBusiness & ProfileConfiguration & {
/**
 * Client ID. The unique identifier for a client.
 * 
 */
id: string;
/**
 * active | deleted
 */
status?: string;
relatedParties?: Array<RelatedPartyResponse>;
/**
 * The products available for clients in a jurisdiction.
 * 
 */
products?: Array<string>;
/**
 * The jurisdiction where the client would be onboarding.
 * 
 */
jurisdiction?: string;
});
