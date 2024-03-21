/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OnboardingStatus } from './OnboardingStatus';

export type ProfileConfiguration = {
    /**
     * Client ID of the platform entity the client is onboarded to.
 * 
     */
    parentClientId?: string;
    /**
     * Once KYC has completed and approved, clients will be able to make payments out of their Embedded Bank Account.
 * This flag will be set to FALSE until this process completes. Only present for clients.
 * 
     */
    enablePayouts?: boolean;
    /**
     * Date the profile was created.
 * 
     */
    createdAt?: string;
    /**
     * active | deleted
     */
    profileStatus?: string;
    /**
     * The client onboarding status
     */
    onboardingStatus?: string;
    onboardedProducts?: Array<{
/**
 * Name of product
 */
product?: string;
/**
 * The product onboarding status
 */
onboardingStatus?: OnboardingStatus;
}>;
};
