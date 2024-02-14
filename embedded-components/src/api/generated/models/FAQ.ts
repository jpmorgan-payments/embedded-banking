/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FAQ = {
    /**
     * Question
     */
    question: string;
    /**
     * Answer
     */
    answer: string;
    /**
     * FAQ Type enum
     */
    type: FAQ.type;
    /**
     * FAQ Tags
     */
    tags: Array<string>;
};

export namespace FAQ {

    /**
     * FAQ Type enum
     */
    export enum type {
        C1_GENERAL = 'C1 General',
        C1_SPECIFIC = 'C1 Specific',
    }


}
