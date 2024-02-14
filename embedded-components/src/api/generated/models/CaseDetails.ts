/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CommentDetails } from './CommentDetails';
import type { ContactDetails } from './ContactDetails';

export type CaseDetails = {
    /**
     * Case identifier.
     */
    id: string;
    /**
     * Case category
     */
    type: CaseDetails.type;
    /**
     * Current status on case.
     */
    status: CaseDetails.status;
    /**
     * How the case was originally reported. This can be by form, phone, or email.
     */
    origin: CaseDetails.origin;
    /**
     * Subject of a case.
     */
    subject: string;
    /**
     * More detailed description of the case.
     */
    description: string;
    /**
     * Date/Time the case was opened
     */
    createdDate: string;
    /**
     * Date/Time the case was closed
     */
    updatedDate: string;
    createdBy: ContactDetails;
    comments?: Array<CommentDetails>;
};

export namespace CaseDetails {

    /**
     * Case category
     */
    export enum type {
        ACCOUNT = 'ACCOUNT',
        CARD = 'CARD',
        ENROLLMENT_OR_SIGNUP = 'ENROLLMENT_OR_SIGNUP',
        OTHER = 'OTHER',
        PROFILE = 'PROFILE',
        STATEMENT = 'STATEMENT',
        SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
        TRANSACTION = 'TRANSACTION',
    }

    /**
     * Current status on case.
     */
    export enum status {
        CLOSED = 'CLOSED',
        REOPEN = 'REOPEN',
        OPEN = 'OPEN',
    }

    /**
     * How the case was originally reported. This can be by form, phone, or email.
     */
    export enum origin {
        PHONE = 'PHONE',
        FORM = 'FORM',
        EMAIL = 'EMAIL',
    }


}
