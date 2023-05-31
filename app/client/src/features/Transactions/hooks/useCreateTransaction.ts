import axios, { AxiosError } from 'axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { API_URL, CLIENT_ID, CLIENT_TOKEN } from 'data/constants';

import type {
  PostTransactionRequest,
  TransactionResponse,
} from 'generated-api-models';

export function useCreateTransaction(): UseMutationResult<
  TransactionResponse,
  AxiosError,
  PostTransactionRequest,
  () => void
> {
  return useMutation(
    ['createTransaction'],
    async (createTransactionRequestBody) => {
      const response = await axios.post<TransactionResponse>(
        `${API_URL}/api/transactions`,
        createTransactionRequestBody,
        {
          headers: {
            client_id: CLIENT_ID,
            token: CLIENT_TOKEN,
          },
        },
      );

      return response.data;
    },
  );
}
