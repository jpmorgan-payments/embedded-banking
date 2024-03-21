/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AnswerRequest = {
    /**
     * The answer/s of a question. Can contain one or more elements. In case where response options are provided, it has to be the id/s depending on single or list format. In case of other formats e.g. freeText, there can be only one element.
 * 
     */
    values: Array<string>;
};
