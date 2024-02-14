/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DocumentTypeSmbdo } from './DocumentTypeSmbdo';

export type DocumentRequestRequirement = {
    documentTypes: Array<DocumentTypeSmbdo>;
    level?: DocumentRequestRequirement.level;
    minRequired?: number;
};

export namespace DocumentRequestRequirement {

    export enum level {
        PRIMARY = 'PRIMARY',
        SECONDARY = 'SECONDARY',
    }


}
