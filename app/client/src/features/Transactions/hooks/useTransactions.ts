import axios, { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { API_URL, CLIENT_ID, CLIENT_TOKEN } from 'data/constants';

import type { ListTransactionsSearchResponse } from 'generated-api-models';

export function useTransactions(): UseQueryResult<
  ListTransactionsSearchResponse,
  AxiosError
> {
  return useQuery(['transactions'], async () => {
    const response = await axios.get<ListTransactionsSearchResponse>(
      `${API_URL}/api/transactions`,
      {
        headers: {
          client_id: CLIENT_ID,
          token: CLIENT_TOKEN,
        },
        params: {
          page: 0,
          limit: 25,
        },
      },
    );

    return response.data;
  });
}
