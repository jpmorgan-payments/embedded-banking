import axios, { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { API_URL, CLIENT_ID, CLIENT_TOKEN } from 'data/constants';

import type { DebitCardsResponse } from 'generated-api-models';

export function useDebitCards(): UseQueryResult<
  DebitCardsResponse,
  AxiosError
> {
  return useQuery(['cards'], async () => {
    const response = await axios.get<DebitCardsResponse>(
      `${API_URL}/api/debit-cards`,
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
