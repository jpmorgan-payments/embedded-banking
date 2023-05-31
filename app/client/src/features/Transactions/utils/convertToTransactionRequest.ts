import type { InferType } from 'yup';
import type { PostTransactionRequest, Recipient } from 'generated-api-models';
import type { validationSchema } from './validationSchema';

export function convertToTransactionRequest(
  values: InferType<typeof validationSchema>,
  recipient?: Recipient,
) {
  return {
    type: values.paymentMethod,
    originatingAccount: values.accountId,
    recipient: recipient ?? {
      id: '',
      account: {},
      partyDetails: {},
    },
    amount: Number(values.amount),
    currency: 'USD',
    memo: '',
    paymentDate: values.date.toLocaleDateString().replace(/\//g, '-'),
  } as PostTransactionRequest;
}
