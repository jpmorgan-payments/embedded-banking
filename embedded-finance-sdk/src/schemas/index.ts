import { hkSchema } from "./hongKong.schema";
import { ukSchema } from "./unitedKingdom.schema";
import { JTDDataType } from "ajv/dist/core";

export const schemas = {
  UK: ukSchema,
  HK: hkSchema,
};

export type CountryKey = keyof typeof schemas;

export type PaymentData = {
  [K in CountryKey]: JTDDataType<(typeof schemas)[K]>;
};
