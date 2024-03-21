/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DocumentTypeItem } from './DocumentTypeItem';

export type DocumentTypes = {
    category?: string;
    organization?: {
primary?: Array<DocumentTypeItem>;
secondary?: Array<DocumentTypeItem>;
};
    individual?: {
primary?: Array<DocumentTypeItem>;
secondary?: Array<DocumentTypeItem>;
};
};
