/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListTransactionsSearchResponseV2 } from '../models/ListTransactionsSearchResponseV2';
import type { PostTransactionRequestV2 } from '../models/PostTransactionRequestV2';
import type { RequestTransactionStatus } from '../models/RequestTransactionStatus';
import type { RequestTransactionTypeV2 } from '../models/RequestTransactionTypeV2';
import type { TransactionGetResponseV2 } from '../models/TransactionGetResponseV2';
import type { TransactionResponseV2 } from '../models/TransactionResponseV2';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TransactionsService {

    /**
     * List transactions
     * Lists transactions for a specific client, which can be filtered using optional parameters.
     * @param token JWT Client token
     * @param type Filters by type of transaction.
     * @param status Filters by transaction status.
     * @param accountId Filters by the Embedded Finance account id connected to the transaction.
     * @param amountEquals Filters by an exact amount.
     * @param amountGreaterThan Filters by amounts greater than a specified value.
     * @param amountLessThan Filters by amounts less than a specified value.
     * @param dateEquals Filters transactions by an exact date.
     * @param dateGreaterThan Filters for transactions made after this payment date.
     * @param dateLessThan Filters for transactions made before this payment date.
     * @param dateTimeGreaterThan Filters for transactions created after this date and time.
     * @param dateTimeLessThan Filters for transactions created before this date and time.
     * @param recipientId Filters for transactions from/to this recipientId.
     * @param transactionReferenceId Filters for a transaction that matches a specific transaction reference ID provided by the client.
     * @param clientId Filters for transactions from/to this clientId.
     * @returns ListTransactionsSearchResponseV2 Ok.
     * @throws ApiError
     */
    public static listTransactionsV2(
token?: string,
type?: RequestTransactionTypeV2,
status?: RequestTransactionStatus,
accountId?: string,
amountEquals?: string,
amountGreaterThan?: string,
amountLessThan?: string,
dateEquals?: string,
dateGreaterThan?: string,
dateLessThan?: string,
dateTimeGreaterThan?: string,
dateTimeLessThan?: string,
recipientId?: string,
transactionReferenceId?: string,
clientId?: string,
): CancelablePromise<ListTransactionsSearchResponseV2> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v2/transactions',
            headers: {
                'token': token,
            },
            query: {
                'type': type,
                'status': status,
                'accountId': accountId,
                'amountEquals': amountEquals,
                'amountGreaterThan': amountGreaterThan,
                'amountLessThan': amountLessThan,
                'dateEquals': dateEquals,
                'dateGreaterThan': dateGreaterThan,
                'dateLessThan': dateLessThan,
                'dateTimeGreaterThan': dateTimeGreaterThan,
                'dateTimeLessThan': dateTimeLessThan,
                'recipientId': recipientId,
                'transactionReferenceId': transactionReferenceId,
                'clientId': clientId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Unauthorized`,
                404: `Not Found`,
                500: `Not Found`,
                503: `Service Unavailable`,
            },
        });
    }

    /**
     * Create transaction
     * Creates a new transaction, such as a payment via ACH, Wire or Real Time Payments (RTP).
     * @param token JWT Client token
     * @param requestBody Contains the required information to create a payment transaction.
     * @returns TransactionResponseV2 Created.
     * @throws ApiError
     */
    public static createTransactionV2(
token?: string,
requestBody?: PostTransactionRequestV2,
): CancelablePromise<TransactionResponseV2> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ef/v2/transactions',
            headers: {
                'token': token,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Unauthorized`,
                404: `Not Found`,
                500: `Not Found`,
                503: `Service Unavailable`,
            },
        });
    }

    /**
     * Get transaction
     * Returns details for a specific transaction using its unique identifier.
     * @param id Unique identifier for a transaction.
     * @param token JWT Client token
     * @returns TransactionGetResponseV2 Ok.
     * @throws ApiError
     */
    public static getTransactionV2(
id: string,
token?: string,
): CancelablePromise<TransactionGetResponseV2> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ef/v2/transactions/{id}',
            path: {
                'id': id,
            },
            headers: {
                'token': token,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Unauthorized`,
                404: `Not Found`,
                500: `Not Found`,
                503: `Service Unavailable`,
            },
        });
    }

}
