import axios, { AxiosError } from 'axios';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { API_URL, CLIENT_ID, CLIENT_TOKEN } from 'data/constants';

import type { ListAccountsResponse } from 'generated-api-models';

export function useAccounts(): UseQueryResult<
  ListAccountsResponse,
  AxiosError
> {
  return useQuery(['accounts'], async () => {
    const response = await axios.get<ListAccountsResponse>(
      `${API_URL}/api/accounts`,
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
