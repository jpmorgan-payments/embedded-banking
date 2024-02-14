/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A limited subset of JSON Schema used to validate the response value items.
 */
export type ResponseSchemaItem = {
    type?: ResponseSchemaItem.type;
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: boolean;
    exclusiveMaximum?: boolean;
    minLength?: number;
    maxLength?: number;
    /**
     * Only applicable to string, number, and integer.
     */
    format?: ResponseSchemaItem.format;
    /**
     * Only applicable to string.
     */
    pattern?: string;
};

export namespace ResponseSchemaItem {

    export enum type {
        BOOLEAN = 'boolean',
        STRING = 'string',
        NUMBER = 'number',
        INTEGER = 'integer',
    }

    /**
     * Only applicable to string, number, and integer.
     */
    export enum format {
        FLOAT = 'float',
        DOUBLE = 'double',
        INT32 = 'int32',
        INT64 = 'int64',
        DATE = 'date',
    }


}
