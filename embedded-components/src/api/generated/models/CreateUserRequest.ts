/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User } from './User';

export type CreateUserRequest = (User & {
/**
 * Email of the user
 */
emailAddress: string;
clientId?: string;
/**
 * The client party id to link the user to. This is applicable when the party already exists for a C2.
 * 
 */
relatedPartyId?: string;
});
