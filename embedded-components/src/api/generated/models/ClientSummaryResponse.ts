/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClientId } from './ClientId';
import type { ClientStatus } from './ClientStatus';
import type { DocumentIdList } from './DocumentIdList';
import type { DocumentRequestIdList } from './DocumentRequestIdList';
import type { PartyId } from './PartyId';
import type { PartyIdList } from './PartyIdList';
import type { PartyRoleList } from './PartyRoleList';
import type { ProductList } from './ProductList';
import type { QuestionIdList } from './QuestionIdList';

export type ClientSummaryResponse = {
    id: ClientId;
    partyId: PartyId;
    products: ProductList;
    outstanding: {
attestationDocumentIds?: DocumentIdList;
documentRequestIds?: DocumentRequestIdList;
questionIds?: QuestionIdList;
partyIds?: PartyIdList;
partyRoles?: PartyRoleList;
};
    status: ClientStatus;
};
