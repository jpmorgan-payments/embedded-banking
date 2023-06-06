import axios, { AxiosError } from 'axios';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { API_URL, CLIENT_ID, CLIENT_TOKEN } from 'data/constants';

import type { TransactionGetResponse } from 'generated-api-models';

export function useTransactionDetails(
  transactionId: string,
): UseQueryResult<TransactionGetResponse, AxiosError> {
  return useQuery(['transaction', transactionId], async () => {
    const response = await axios.get<TransactionGetResponse>(
      `${API_URL}/api/transactions`,
      {
        headers: {
          client_id: CLIENT_ID,
          token: CLIENT_TOKEN,
        },
        params: {
          id: transactionId,
        },
      },
    );

    return response.data;
  });
}
