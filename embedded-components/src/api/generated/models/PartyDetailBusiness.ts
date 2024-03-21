/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PartyDetailCommon } from './PartyDetailCommon';

export type PartyDetailBusiness = (PartyDetailCommon & {
/**
 * The type of business connected to the client. You can use the Reference Data resource to get a list of acceptable values. Examples include: Privately Owned Business. Sole Proprietorship.
 * 
 */
businessType?: string;
/**
 * Legal Structure of the business entity. Legal structure is required for Privately Owned Business and Sole Proprietorship. Distinct legal structure. e.g. - Limited Liability Company - Corporation - Limited Partnership - Sole Proprietorship
 * 
 */
legalStructure?: string;
/**
 * The industry category of the business connected to the client. For example, Accommodation and Food Services. You can use the Reference Data resource to get a list of acceptable values.
 * 
 */
industryCategory?: string;
/**
 * The industry type of the business connected to the client. You can use the Reference Data resource to get a list of acceptable values.
 * 
 */
industryType?: string;
/**
 * Significant ownership means there individuals who own 25% or more of the client's business. Always required for a Privately Owned Business. If Significant Ownership is selected as True, At least one related party should have the role of owner.
 * 
 */
significantOwnership?: boolean;
/**
 * Entities in ownership means that one or more businesses own part of the business conected to the client. Always required for a Privately Owned Business.
 * 
 */
entitiesInOwnership?: boolean;
/**
 * The business’s legal name. It is the official name of the person or entity that owns a company. Must be the name used on the client's government forms and business paperwork
 * 
 */
businessName?: string;
/**
 * Any alias names for the business connected to the client.
 * 
 */
businessAliasName?: string;
/**
 * The business’s description.
 * 
 */
businessDescription?: string;
/**
 * Whether or not the business connected to the client has a website.
 * 
 */
websiteAvailable?: boolean;
/**
 * Website of the business connected to the client. Always required if websiteAvailable is true.
 * 
 */
website?: string;
/**
 * Email of the client.
 * 
 */
email?: string;
/**
 * Country code in alpha-2 format
 */
countryOfFormation?: string;
/**
 * Year of company formation. Max and Min length is 4.
 * 
 */
yearOfFormation?: string;
/**
 * The parent (platform) relationship owner's ID.
 */
parentClientId?: string;
});
