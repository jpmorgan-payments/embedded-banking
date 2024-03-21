/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentRoutingStatus } from './PaymentRoutingStatus';
import type { RoutingInformationDto } from './RoutingInformationDto';
import type { schemas_CountryCode } from './schemas_CountryCode';

export type PaymentRoutingInformationDtoWithStatus = {
    /**
     * Account number (PRN)
     */
    accountNumber: string;
    country: schemas_CountryCode;
    /**
     * Routing information
     */
    routingInformation?: Array<RoutingInformationDto>;
    status: PaymentRoutingStatus;
};
