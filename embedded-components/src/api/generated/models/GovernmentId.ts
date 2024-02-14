/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GovernmentId = {
    idType?: GovernmentId.idType;
    idIssuanceCountry?: string;
    idValue?: string;
    idIssuanceDate?: string;
    idExpirationDate?: string;
};

export namespace GovernmentId {

    export enum idType {
        L = 'L',
        P = 'P',
        R = 'R',
        T = 'T',
        U = 'U',
        V = 'V',
        X = 'X',
    }


}
