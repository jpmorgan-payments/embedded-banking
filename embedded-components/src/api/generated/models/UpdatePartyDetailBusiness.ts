/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UpdatePartyDetailCommon } from './UpdatePartyDetailCommon';

export type UpdatePartyDetailBusiness = (UpdatePartyDetailCommon & {
/**
 * The different business entity types that can be selected e.g. Privately Owned Business | Sole Proprietorship
 * 
 */
businessType?: string;
/**
 * Legal Structure of the business entity. Legal structure is required for Privately Owned Business and Sole Proprietorship.
 * 
 */
legalStructure?: string;
/**
 * Distinct industry category. e.g. - Accommodation and Food Services - Administrative and Support and Waste Management and Remediation Services - Agriculture, Forestry, Fishing and Hunting (not covered in economic census) - Arts, Entertainment, and Recreation - Construction - Educational Services - Finance and Insurance - Health Care and Social Assistance - Individuals - Information - Management of Companies and Enterprises - Manufacturing - Mining, Quarrying, and Oil and Gas Extraction - Other Services (except Public Administration) - Professional, Scientific, and Technical Services - Public Administration (not covered in economic census) - Real Estate and Rental and Leasing - Retail Trade - Transportation and Warehousing - Utilities - Wholesale Trade
 * 
 */
industryCategory?: string;
/**
 * Industry type.
 * 
 */
industryType?: string;
/**
 * Are there any individuals who own 25% or more of your business? e.g. true|false. significantOwnership is required for Privately Owned Business. If Significant Ownership is selected as True, At least one related party should have a role of owner.
 * 
 */
significantOwnership?: boolean;
/**
 * If entitiesInOwnership is true, are there any businesses included in your ownership hierarchy? e.g. true|false. entitiesInOwnership is required for Privately Owned Business.
 * 
 */
entitiesInOwnership?: boolean;
/**
 * The business’s legal name. It is the official name of the person or entity that owns a company.
 * And, it’s the name used on your government forms and business paperwork
 * 
 */
businessName?: string;
/**
 * The business’s alias name. It is the other alias name of the  entity that owns a company.This field can be set to empty by passing field value as ("") in request.
 * 
 */
businessAliasName?: string;
/**
 * The business’s description.
 * 
 */
businessDescription?: string;
/**
 * Does your business have a website? e.g. true|false
 * 
 */
websiteAvailable?: boolean;
/**
 * Website of the client. website is required if websiteAvailable is true.This field can be set to empty by passing field value as ("") in request.
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
 * Year of formation. Max and Min length is 4.
 * 
 */
yearOfFormation?: string;
});
