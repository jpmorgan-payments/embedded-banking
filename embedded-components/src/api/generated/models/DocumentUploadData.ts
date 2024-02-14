/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DocumentMetadata } from './DocumentMetadata';
import type { DocumentType } from './DocumentType';
import type { ProductType } from './ProductType';

export type DocumentUploadData = {
    documentType: DocumentType;
    productType: ProductType;
    metadata?: Array<DocumentMetadata>;
};
