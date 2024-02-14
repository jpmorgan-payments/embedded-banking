/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ContactDetails } from './ContactDetails';

export type CasesDetails = {
    /**
     * Case ID. A unique identifier for a case.
     */
    id: string;
    /**
     * Case category
     */
    type: CasesDetails.type;
    /**
     * Current status on case
     */
    status: CasesDetails.status;
    /**
     * Subject of a case
     */
    subject: string;
    /**
     * Date/Time the case was opened
     */
    createdDate: string;
    /**
     * Date/Time the case was closed
     */
    updatedDate: string;
    createdBy: ContactDetails;
};

export namespace CasesDetails {

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
     * Current status on case
     */
    export enum status {
        CLOSED = 'CLOSED',
        REOPEN = 'REOPEN',
        OPEN = 'OPEN',
    }


}
