import { renderHook, act, waitFor } from "@testing-library/react";
import { usePaymentValidation } from "../usePaymentValidation";
import { ukSchema } from "../schemas/unitedKingdom.schema";
import { extractFieldDefinitions } from "../utils/extractFieldDefinitions";

describe("usePaymentValidation", () => {
  it("validates correctly", () => {
    const { result } = renderHook(() => usePaymentValidation("UK"));

    act(() => {
      const { valid, errors } = result.current.validate({
        beneficiaryBankBIC: "BKENGB2LCON",
        paymentMethod: "TRF",
        purposeOfPayment: "purpose",
        beneficiaryBankName: "Bank Name",
        beneficiaryBankAddress: "123",
        beneficiaryBankRoutingCode: "123456789",
        originatorName: "John Doe",
        originatorAddress: "123 Road",
        originatorAccountNumber: "123456",
        beneficiaryName: "Ben E",
        beneficiaryAccountNumber: "123456",
      });

      expect(errors).toStrictEqual({});
      expect(valid).toBe(true);
    });

    act(() => {
      const { errors, valid } = result.current.validate({
        initiatingPartyName: "hello",
        paymentMethod: "ABC",
        purposeOfPayment: "purpose",
      });

      expect(valid).toBe(false);
      expect(errors?.paymentMethod).toBeDefined();
      waitFor(() => {
        expect(result.current.errors.paymentMethod).toBeDefined();
      });
    });
  });

  it("validates individual field correctly", () => {
    const { result } = renderHook(() => usePaymentValidation("UK"));

    act(() => {
      const { valid } = result.current.validateField("paymentMethod", "TRF");

      expect(valid).toBe(true);
    });

    act(() => {
      const { valid } = result.current.validateField("paymentMethod", "CHK");

      expect(valid).toBe(false);
      waitFor(() => {
        expect(result.current.errors.paymentMethod).toBeDefined();
      });
    });
  });

  it("returns correct field definitions", () => {
    const { result } = renderHook(() => usePaymentValidation("UK"));
    act(() => {
      const fields = result.current.fieldDefinitions;
      expect(fields).toEqual(extractFieldDefinitions(ukSchema));
    });
  });

  it("returns global error for invalid input", () => {
    // @ts-ignore
    const { result } = renderHook(() => usePaymentValidation("ABC"));

    act(() => {
      const { valid } = result.current.validate({});

      expect(valid).toBe(false);
      waitFor(() => {
        expect(result.current.errors._global).toBeDefined();
      });
    });
  });
});
