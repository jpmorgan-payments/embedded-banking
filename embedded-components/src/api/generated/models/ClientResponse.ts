/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Attestation } from './Attestation';
import type { ClientId } from './ClientId';
import type { ClientStatus } from './ClientStatus';
import type { DocumentIdList } from './DocumentIdList';
import type { DocumentRequestIdList } from './DocumentRequestIdList';
import type { PartyId } from './PartyId';
import type { PartyIdList } from './PartyIdList';
import type { PartyResponse } from './PartyResponse';
import type { PartyRoleList } from './PartyRoleList';
import type { ProductList } from './ProductList';
import type { QuestionIdList } from './QuestionIdList';
import type { QuestionResponse } from './QuestionResponse';

export type ClientResponse = {
    attestations?: Array<Attestation>;
    id: ClientId;
    parties?: Array<PartyResponse>;
    partyId: PartyId;
    products: ProductList;
    outstanding: {
attestationDocumentIds?: DocumentIdList;
documentRequestIds?: DocumentRequestIdList;
questionIds?: QuestionIdList;
partyIds?: PartyIdList;
partyRoles?: PartyRoleList;
};
    questionResponses?: Array<QuestionResponse>;
    status: ClientStatus;
};
