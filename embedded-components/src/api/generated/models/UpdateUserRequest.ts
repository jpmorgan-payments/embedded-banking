/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoleRequest } from './RoleRequest';
import type { Status } from './Status';
import type { User } from './User';

export type UpdateUserRequest = (User & {
status?: Status;
roles?: Array<RoleRequest>;
});
