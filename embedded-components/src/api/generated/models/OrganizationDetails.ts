/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddressDtoSmbdo } from './AddressDtoSmbdo';
import type { CountryCodeIsoAlpha2 } from './CountryCodeIsoAlpha2';
import type { DbaName } from './DbaName';
import type { EntitiesInOwnership } from './EntitiesInOwnership';
import type { OrganizationDescription } from './OrganizationDescription';
import type { OrganizationIdentityDto } from './OrganizationIdentityDto';
import type { OrganizationIndustryCategory } from './OrganizationIndustryCategory';
import type { OrganizationIndustryType } from './OrganizationIndustryType';
import type { OrganizationName } from './OrganizationName';
import type { OrganizationType } from './OrganizationType';
import type { PhoneSmbdo } from './PhoneSmbdo';
import type { SignificantOwnership } from './SignificantOwnership';
import type { TradeOverInternet } from './TradeOverInternet';
import type { Website } from './Website';
import type { WebsiteAvailable } from './WebsiteAvailable';
import type { YearOfFormation } from './YearOfFormation';

export type OrganizationDetails = {
    addresses?: Array<AddressDtoSmbdo>;
    associatedCountries?: Array<CountryCodeIsoAlpha2>;
    countryOfFormation?: CountryCodeIsoAlpha2;
    dbaName?: DbaName;
    entitiesInOwnership?: EntitiesInOwnership;
    industryCategory?: OrganizationIndustryCategory;
    industryType?: OrganizationIndustryType;
    jurisdiction?: CountryCodeIsoAlpha2;
    organizationName?: OrganizationName;
    organizationDescription?: OrganizationDescription;
    organizationType?: OrganizationType;
    organizationIds?: Array<OrganizationIdentityDto>;
    phone?: PhoneSmbdo;
    significantOwnership?: SignificantOwnership;
    tradeOverInternet?: TradeOverInternet;
    website?: Website;
    websiteAvailable?: WebsiteAvailable;
    yearOfFormation?: YearOfFormation;
};
