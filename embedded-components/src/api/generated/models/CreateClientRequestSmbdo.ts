/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Attestation } from './Attestation';
import type { CreatePartyRequestInlineRequired } from './CreatePartyRequestInlineRequired';
import type { PartyId } from './PartyId';
import type { ProductList } from './ProductList';

export type CreateClientRequestSmbdo = {
    attestations?: Array<Attestation>;
    parties?: Array<CreatePartyRequestInlineRequired>;
    partyId?: PartyId;
    products: ProductList;
};
