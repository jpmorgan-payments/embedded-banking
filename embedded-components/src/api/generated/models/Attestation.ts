/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DocumentId } from './DocumentId';

export type Attestation = {
    /**
     * The full name of an individual.
     */
    attesterFullName?: string;
    attestationTime?: string;
    documentId?: DocumentId;
    /**
     * IPv4 Address.
     */
    ipAddress?: string;
};
