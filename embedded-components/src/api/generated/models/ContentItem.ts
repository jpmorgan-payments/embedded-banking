/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocaleId } from './LocaleId';

/**
 * Content displayed to a user for a given locale.
 */
export type ContentItem = {
    description?: string;
    /**
     * Exact text to be displayed to a user.
     */
    label: string;
    locale: LocaleId;
};
