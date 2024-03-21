/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnswerOption } from './AnswerOption';

export type AnswerResponse = {
    /**
     * The answer/s of a question. Can contain one or more elements.
 * 
     */
    values?: Array<string>;
    /**
     * date time of submission in ISO format yyyy-MM-ddTHH:mm:ss
     */
    updatedDateTime?: string;
    /**
     * Can be single for one item in the values or list in case of more than one values. The other options are word, freeText, alphaNumeric and there will be only one element allowed
     */
    format?: string;
    /**
     * max length allowed in values field. In case of freeText, the maximum length is 2000
     */
    maxLength?: number;
    /**
     * Id of parent Question
     */
    parentId?: string;
    answerOptions?: Array<AnswerOption>;
};
