import axios, { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { API_URL, CLIENT_ID, CLIENT_TOKEN } from 'data/constants';

import type { ListRecipientsResponse } from 'generated-api-models';

export function useRecipients(): UseQueryResult<
  ListRecipientsResponse,
  AxiosError
> {
  return useQuery(['recipients'], async () => {
    const response = await axios.get<ListRecipientsResponse>(
      `${API_URL}/api/recipients`,
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
