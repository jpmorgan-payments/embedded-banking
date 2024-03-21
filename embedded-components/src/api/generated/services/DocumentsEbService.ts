/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentDetails } from '../models/DocumentDetails';
import type { DocumentUploadData } from '../models/DocumentUploadData';
import type { ListDocumentsDetailsResponse } from '../models/ListDocumentsDetailsResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DocumentsEbService {

    /**
     * Get details of documents of a specified type
     * Returns details of documents and their ids based on the product and jurisdiction for a client.
     * @param type The type of document. Can be terms and conditions or disclosure and consent documents.
     * @param token JWT Client token
     * @param limit Number of records per page.
     * @param page Page Number
     * @returns ListDocumentsDetailsResponse Ok.
     * @throws ApiError
     */
    public static documentsDetails(
type: 'TERMS_CONDITION' | 'DISCLOSURE_AND_CONSENT',
token?: string,
limit: number = 25,
page?: number,
): CancelablePromise<ListDocumentsDetailsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/documents',
            headers: {
                'token': token,
            },
            query: {
                'type': type,
                'limit': limit,
                'page': page,
            },
            errors: {
                400: `Bad Request`,
                401: `Forbidden`,
                403: `Unauthorized`,
                404: `Service Unavailable`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

    /**
     * Upload document
     * - This end point allows the end user to upload document.
 * - File types allowed are : heic, jpeg, jpg, pdf, png.
 * - The maximum size allowed for the document through this API is 5MB.
 * 
     * @param token JWT Client token
     * @param formData This section allows the user to attach the binary file upload and meta-data associated with the document.
 * 
     * @returns DocumentDetails Ok.
     * @throws ApiError
     */
    public static uploadDocument(
token?: string,
formData?: {
file: Blob;
documentData: DocumentUploadData;
},
): CancelablePromise<DocumentDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/v1/documents',
            headers: {
                'token': token,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
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
     * Retrieve details of a document
     * Retrieves details of a document using the document unique identifier.
     * @param id Document unique identifier.
     * @param token JWT Client token
     * @returns DocumentDetails Ok.
     * @throws ApiError
     */
    public static getDocumentDetails(
id: string,
token?: string,
): CancelablePromise<DocumentDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/documents/{id}',
            path: {
                'id': id,
            },
            headers: {
                'token': token,
            },
            errors: {
                400: `Bad Request`,
                401: `Forbidden`,
                403: `Unauthorized`,
                404: `Service Unavailable`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

    /**
     * Download a document
     * Download a document using the document unique identifier.
     * @param id Document unique identifier.
     * @param token JWT Client token
     * @returns string Ok.
     * @throws ApiError
     */
    public static downloadDocument(
id: string,
token?: string,
): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v1/documents/{id}/file',
            path: {
                'id': id,
            },
            headers: {
                'token': token,
            },
            errors: {
                400: `Bad Request`,
                401: `Forbidden`,
                403: `Unauthorized`,
                404: `Service Unavailable`,
                500: `Internal Server Error`,
                503: `Not Found`,
            },
        });
    }

}
