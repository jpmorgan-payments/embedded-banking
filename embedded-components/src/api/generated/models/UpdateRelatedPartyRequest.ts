/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UpdatePartyDetailCommon } from './UpdatePartyDetailCommon';

export type UpdateRelatedPartyRequest = (UpdatePartyDetailCommon & {
/**
 * Unique identifier for this party. It is only required for UPDATE and REMOVE actions
 * 
 */
id?: string;
/**
 * The business’s legal name. It is the official name of the person or entity that owns a company. And, it’s the name used on your government forms and business paperwork. This field is only required when party type is NON-IND
 * 
 */
businessName?: string;
/**
 * First name of the individual in case of party type being an individual like Owners, Controllers and Decision Makers.
 * 
 */
firstName?: string;
/**
 * Middle name of the individual in case of party type being an individual.This field can be set to empty by passing field value as ("") in request.
 * 
 */
middleName?: string;
/**
 * Last name of the individual in case of party type being an individual like Owners, Controllers and Decision Makers.
 * 
 */
lastName?: string;
/**
 * Job title in case of party type being an individual. JobTitle is required field for Controllers. Also, If Privately Owned Business is selected as the business type, Job Title should be a required field for Decision Makers. e.g. CEO|CFO|COO|President|Chairman|Senior Branch Manager|Other
 * 
 */
jobTitle?: string;
/**
 * In case on jobTitle is Other then Job title description is required.This field can be set to empty by passing field value as ("") in request.
 * 
 */
jobTitleDescription?: string;
/**
 * The date of birth (yyyy-MM-dd) of the individual in case of party type being an individual. This field is not required for the party type Organization.
 * 
 */
birthDate?: string;
/**
 * Email of the individual.
 * 
 */
email?: string;
/**
 * Nature of ownership e.g. Direct|Indirect.This field can be set to empty by passing field value as ("") in request.
 * 
 */
natureOfOwnership?: string;
soleOwner?: boolean;
/**
 * A Party type which could have one of the following distinct values: Organization, Individual, NonIndividual
 * 
 */
partyType?: string;
/**
 * A Party role which could have one or more of the following values: CLIENT, CONTROLLER, MARKETPLACE_OPERATOR, OWNER, PAYEE, DECISION_MAKER
 * If a SMB controller and owner is the same person - you have to send two parties with the distinct partyRoles e.g. [ CLIENT, CONTROLLER, MARKETPLACE_OPERATOR, OWNER, DECISION_MAKER ]
 * 
 */
partyRole?: Array<string>;
});
