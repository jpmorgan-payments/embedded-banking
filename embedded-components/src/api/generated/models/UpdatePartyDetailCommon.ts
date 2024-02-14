/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UpdateAddressDto } from './UpdateAddressDto';
import type { UpdateIdentityDTO } from './UpdateIdentityDTO';
import type { UpdatePhone } from './UpdatePhone';

export type UpdatePartyDetailCommon = {
    address?: UpdateAddressDto;
    phone?: UpdatePhone;
    identities?: Array<UpdateIdentityDTO>;
};
