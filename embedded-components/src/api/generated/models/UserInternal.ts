/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { schemas_Address } from './schemas_Address';
import type { schemas_Phone } from './schemas_Phone';

export type UserInternal = {
    /**
     * Email of the user
     */
    email?: string;
    phone?: schemas_Phone;
    /**
     * First name of the individual in case of party type being an individual like Owners, Controllers and Decision Makers.
 * 
     */
    firstName?: string;
    /**
     * Middle name of the individual in case of party type being an individual.
 * 
     */
    middleName?: string;
    /**
     * Last name of the individual in case of party type being an  individual like Owners, Controllers and Decision Makers.
 * 
     */
    lastName?: string;
    address?: schemas_Address;
};
