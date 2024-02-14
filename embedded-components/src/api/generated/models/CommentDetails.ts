/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ContactDetails } from './ContactDetails';

export type CommentDetails = {
    /**
     * Comment creation date
     */
    createdDate: string;
    /**
     * Comment description or a copy of the main points of the comment.
     */
    comment: string;
    commentedBy: ContactDetails;
};
