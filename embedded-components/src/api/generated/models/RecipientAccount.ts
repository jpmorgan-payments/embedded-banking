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
 * Bank account details of the recipient.
 */
export type RecipientAccount = {
    number: AccountNumber;
    type?: AccountType;
    routingCodeType: RoutingCodeType;
    routingNumber: RoutingNumber;
    countryCode: CountryCode;
};
