/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClientId } from './ClientId';
import type { CountryCodeSmbdo } from './CountryCodeSmbdo';
import type { DocumentRequestId } from './DocumentRequestId';
import type { DocumentRequestRequirement } from './DocumentRequestRequirement';
import type { DocumentRequestStatus } from './DocumentRequestStatus';
import type { DocumentTypeSmbdo } from './DocumentTypeSmbdo';
import type { PartyId } from './PartyId';
import type { ValidForDays } from './ValidForDays';

export type DocumentRequestResponse = {
    clientId?: ClientId;
    country?: CountryCodeSmbdo;
    createdAt?: string;
    documentType?: DocumentTypeSmbdo;
    id?: DocumentRequestId;
    partyId?: PartyId;
    /**
     * Any one requirement must be fulfilled.
     */
    requirements?: Array<DocumentRequestRequirement>;
    status?: DocumentRequestStatus;
    updatedAt?: string;
    validForDays?: ValidForDays;
};
