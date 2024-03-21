/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddressTypesResponse } from '../models/AddressTypesResponse';
import type { BusinessTypesResponse } from '../models/BusinessTypesResponse';
import type { CountriesResponse } from '../models/CountriesResponse';
import type { CountrySubdivisionResponse } from '../models/CountrySubdivisionResponse';
import type { DocumentTypesResponse } from '../models/DocumentTypesResponse';
import type { IdentificationTypeResponse } from '../models/IdentificationTypeResponse';
import type { IndustryCategoriesResponse } from '../models/IndustryCategoriesResponse';
import type { JobTitlesResponse } from '../models/JobTitlesResponse';
import type { LegalStructureResponse } from '../models/LegalStructureResponse';
import type { NatureOfOwnershipsResponse } from '../models/NatureOfOwnershipsResponse';
import type { PartyRolesResponse } from '../models/PartyRolesResponse';
import type { PartyTypesResponse } from '../models/PartyTypesResponse';
import type { ProductResponse } from '../models/ProductResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ReferenceDataService {

    /**
     * List available countries and country codes
     * Retrieves a list of countries with their ISO 2-character codes.
     * @param token JWT Client token
     * @returns CountriesResponse Ok.
     * @throws ApiError
     */
    public static getAllCountries(
token?: string,
): CancelablePromise<CountriesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/countries',
            headers: {
                'token': token,
            },
            errors: {
                400: `Bad Request`,
                401: `Forbidden`,
                403: `Unauthorized`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

    /**
     * List available country subdivisions
     * Retrieves a list of subdivisions within a country. For example, the states of the USA.
     * @param token JWT Client token
     * @param countryCode Two-letter ISO code for a country, such as US for USA.
     * @param limit Number of records per page.
     * @param page Page Number
     * @returns CountrySubdivisionResponse Ok.
     * @throws ApiError
     */
    public static getCountrySubdivision(
token?: string,
countryCode?: string,
limit: number = 25,
page?: number,
): CancelablePromise<CountrySubdivisionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/country-subdivision',
            headers: {
                'token': token,
            },
            query: {
                'countryCode': countryCode,
                'limit': limit,
                'page': page,
            },
            errors: {
                400: `Bad Request`,
                401: `Forbidden`,
                403: `Unauthorized`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

    /**
     * List legal structures
     * Returns a list of legal structures of a business. To be used when onboarding business clients.
     * @param token JWT Client token
     * @returns LegalStructureResponse Ok.
     * @throws ApiError
     */
    public static getLegalStructures(
token?: string,
): CancelablePromise<LegalStructureResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/legal-structures',
            headers: {
                'token': token,
            },
            errors: {
                400: `Bad Request`,
                401: `Forbidden`,
                403: `Unauthorized`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

    /**
     * List supporting document-types
     * Returns a list of supporting documents that may be required during onboarding and ongoing checks.
     * @param token JWT Client token
     * @param countryCode Two-letter ISO code for a country, such as US for USA.
     * @param documentCategory Document category type.
     * @param legalStructure url encoded legalStructure type.
     * @param limit Number of records per page.
     * @param page Page Number
     * @returns DocumentTypesResponse Ok.
     * @throws ApiError
     */
    public static getDocumentTypes(
token?: string,
countryCode?: string,
documentCategory?: 'IDENTITY_VERIFICATION',
legalStructure?: string,
limit: number = 25,
page?: number,
): CancelablePromise<DocumentTypesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/document-types',
            headers: {
                'token': token,
            },
            query: {
                'countryCode': countryCode,
                'documentCategory': documentCategory,
                'legalStructure': legalStructure,
                'limit': limit,
                'page': page,
            },
            errors: {
                400: `Bad Request`,
                401: `Forbidden`,
                403: `Unauthorized`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

    /**
     * List acceptable ID types
     * Returns a list of acceptable types of ID that can be submitted for onboarding or other client checks.
     * @param token JWT Client token
     * @returns IdentificationTypeResponse Ok.
     * @throws ApiError
     */
    public static getIdTypes(
token?: string,
): CancelablePromise<IdentificationTypeResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/id-types',
            headers: {
                'token': token,
            },
            errors: {
                400: `Bad Request`,
                401: `Forbidden`,
                403: `Unauthorized`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

    /**
     * List industry categories and industry types.
     * Returns a list of all industry categories and industry types for business clients. To be used in onboarding and other client checks.
     * @param token JWT Client token
     * @param limit Number of records per page.
     * @param page Page Number
     * @returns IndustryCategoriesResponse Ok.
     * @throws ApiError
     */
    public static getClientIndustryCategories(
token?: string,
limit: number = 25,
page?: number,
): CancelablePromise<IndustryCategoriesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/industry-categories',
            headers: {
                'token': token,
            },
            query: {
                'limit': limit,
                'page': page,
            },
            errors: {
                400: `Bad Request`,
                401: `Forbidden`,
                403: `Unauthorized`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

    /**
     * List embedded finance products
     * Returns a list of all available Embedded Finance products.
     * @param token JWT Client token
     * @returns ProductResponse Ok.
     * @throws ApiError
     */
    public static getRefProducts(
token?: string,
): CancelablePromise<ProductResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/products',
            headers: {
                'token': token,
            },
            errors: {
                400: `Bad Request`,
                401: `Forbidden`,
                403: `Unauthorized`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

    /**
     * List business types
     * Returns a list of business types that can be used for client onboarding processes.
     * @param token JWT Client token
     * @returns BusinessTypesResponse Ok.
     * @throws ApiError
     */
    public static getRefBusinessTypes(
token?: string,
): CancelablePromise<BusinessTypesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/business-types',
            headers: {
                'token': token,
            },
            errors: {
                400: `Bad Request`,
                401: `Forbidden`,
                403: `Unauthorized`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

    /**
     * List job titles
     * Returns a list of job titles that can be used for client onboarding.
     * @param token JWT Client token
     * @returns JobTitlesResponse Ok.
     * @throws ApiError
     */
    public static getRefJobTitles(
token?: string,
): CancelablePromise<JobTitlesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/job-titles',
            headers: {
                'token': token,
            },
            errors: {
                400: `Bad Request`,
                401: `Forbidden`,
                403: `Unauthorized`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

    /**
     * List party roles
     * Returns a list of accepted party roles.
     * @param token JWT Client token
     * @returns PartyRolesResponse Ok.
     * @throws ApiError
     */
    public static getRefPartyRoles(
token?: string,
): CancelablePromise<PartyRolesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/party-roles',
            headers: {
                'token': token,
            },
            errors: {
                400: `Bad Request`,
                401: `Forbidden`,
                403: `Unauthorized`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

    /**
     * List address types
     * Returns a list of accepted address types.
     * @param token JWT Client token
     * @returns AddressTypesResponse Ok.
     * @throws ApiError
     */
    public static getRefAddressTypes(
token?: string,
): CancelablePromise<AddressTypesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/address-types',
            headers: {
                'token': token,
            },
            errors: {
                400: `Bad Request`,
                401: `Forbidden`,
                403: `Unauthorized`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

    /**
     * List nature of ownership values
     * Returns a list of accepted Nature Of Ownership values.
     * @param token JWT Client token
     * @returns NatureOfOwnershipsResponse Ok.
     * @throws ApiError
     */
    public static getRefNatureOfOwnerships(
token?: string,
): CancelablePromise<NatureOfOwnershipsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/nature-of-ownerships',
            headers: {
                'token': token,
            },
            errors: {
                400: `Bad Request`,
                401: `Forbidden`,
                403: `Unauthorized`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

    /**
     * List party types
     * Returns a list of accepted party types.
     * @param token JWT Client token
     * @returns PartyTypesResponse Ok.
     * @throws ApiError
     */
    public static getRefPartyTypes(
token?: string,
): CancelablePromise<PartyTypesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/party-types',
            headers: {
                'token': token,
            },
            errors: {
                400: `Bad Request`,
                401: `Forbidden`,
                403: `Unauthorized`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

}
