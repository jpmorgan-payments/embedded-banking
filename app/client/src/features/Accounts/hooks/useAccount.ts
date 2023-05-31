import axios, { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { API_URL, CLIENT_ID, CLIENT_TOKEN } from 'data/constants';

import type { AccountResponse } from 'generated-api-models';

export function useAccount(
  accountId: string,
): UseQueryResult<AccountResponse, AxiosError> {
  return useQuery(['account', accountId], async () => {
    const response = await axios.get<AccountResponse>(
      `${API_URL}/api/accounts/${accountId}`,
      {
        headers: {
          client_id: CLIENT_ID,
          token: CLIENT_TOKEN,
        },
      },
    );

    return response.data;
  });
}
