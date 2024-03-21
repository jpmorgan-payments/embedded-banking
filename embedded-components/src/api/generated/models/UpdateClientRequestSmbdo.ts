/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Attestation } from './Attestation';
import type { AttestationRemoval } from './AttestationRemoval';
import type { CreatePartyRequestInline } from './CreatePartyRequestInline';
import type { ProductList } from './ProductList';
import type { QuestionResponse } from './QuestionResponse';
import type { UpdatePartyRequestInline } from './UpdatePartyRequestInline';

export type UpdateClientRequestSmbdo = {
    addAttestations?: Array<Attestation>;
    addProducts?: ProductList;
    /**
     * Update a party by specifying its ID in the object. Create a party by setting `parentPartyId` to the client's root party. `partyType` and `roles` are required when creating a new party.
 * 
     */
    addParties?: Array<(CreatePartyRequestInline & UpdatePartyRequestInline)>;
    questionResponses?: Array<QuestionResponse>;
    removeAttestations?: Array<AttestationRemoval>;
};
