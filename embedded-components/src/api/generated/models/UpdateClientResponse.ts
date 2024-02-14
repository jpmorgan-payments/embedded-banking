/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UpdateEntityDetailBusinessRequest } from './UpdateEntityDetailBusinessRequest';
import type { UpdateRelatedPartiesResponse } from './UpdateRelatedPartiesResponse';

export type UpdateClientResponse = (UpdateEntityDetailBusinessRequest & {
relatedParties?: Array<UpdateRelatedPartiesResponse>;
/**
 * The products available for clients.
 * 
 */
products?: Array<string>;
});
