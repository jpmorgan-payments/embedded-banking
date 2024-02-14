/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ResponseSchemaItem } from './ResponseSchemaItem';

/**
 * A subset of JSON Schema used to validate the response values.
 */
export type ResponseSchema = {
    type?: ResponseSchema.type;
    minItems?: number;
    maxItems?: number;
    items?: ResponseSchemaItem;
};

export namespace ResponseSchema {

    export enum type {
        ARRAY = 'array',
    }


}
