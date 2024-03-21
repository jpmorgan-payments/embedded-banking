/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AccountBalanceDto = {
    /**
     * Balance type: ITAV (interim available balance) or ITBD (interim booked balance)
     */
    typeCode: AccountBalanceDto.typeCode;
    /**
     * Balance amount
     */
    amount: number;
};

export namespace AccountBalanceDto {

    /**
     * Balance type: ITAV (interim available balance) or ITBD (interim booked balance)
     */
    export enum typeCode {
        ITAV = 'ITAV',
        ITBD = 'ITBD',
    }


}
