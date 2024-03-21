/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountNumber } from './AccountNumber';
import type { AccountType } from './AccountType';
import type { CountryCode } from './CountryCode';
import type { RoutingCodeType } from './RoutingCodeType';
import type { RoutingNumber } from './RoutingNumber';

/**
 * First line of the recipient's postal address.
 * For payment types ACH, WIRE and RTP routingCodeType, routingNumber and countryCode are required.
 * For payment type of ACH account type is required.
 * 
 */
export type TransactionRecipientAccount = {
    number: AccountNumber;
    type?: AccountType;
    routingCodeType?: RoutingCodeType;
    routingNumber?: RoutingNumber;
    countryCode?: CountryCode;
};
