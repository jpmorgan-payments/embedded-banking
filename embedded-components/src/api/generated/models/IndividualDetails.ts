/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddressDtoSmbdo } from './AddressDtoSmbdo';
import type { BirthDate } from './BirthDate';
import type { CountryCodeIsoAlpha2 } from './CountryCodeIsoAlpha2';
import type { FirstName } from './FirstName';
import type { IndividualIdentityDTO } from './IndividualIdentityDTO';
import type { IndividualJobTitle } from './IndividualJobTitle';
import type { IndividualJobTitleDescription } from './IndividualJobTitleDescription';
import type { LastName } from './LastName';
import type { MiddleName } from './MiddleName';
import type { NameSuffix } from './NameSuffix';
import type { NatureOfOwnership } from './NatureOfOwnership';
import type { PhoneSmbdo } from './PhoneSmbdo';
import type { SoleOwner } from './SoleOwner';

export type IndividualDetails = {
    addresses?: Array<AddressDtoSmbdo>;
    birthDate?: BirthDate;
    countryOfResidence?: CountryCodeIsoAlpha2;
    firstName?: FirstName;
    middleName?: MiddleName;
    lastName?: LastName;
    nameSuffix?: NameSuffix;
    individualIds?: Array<IndividualIdentityDTO>;
    jobTitle?: IndividualJobTitle;
    jobTitleDescription?: IndividualJobTitleDescription;
    phone?: PhoneSmbdo;
    natureOfOwnership?: NatureOfOwnership;
    soleOwner?: SoleOwner;
};
