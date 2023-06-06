import axios, { AxiosError } from 'axios';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { API_URL, CLIENT_ID, CLIENT_TOKEN } from 'data/constants';

import type { CasesPaginationResponse } from 'generated-api-models';

export function useCases(): UseQueryResult<
  CasesPaginationResponse,
  AxiosError
> {
  return useQuery(['cases'], async () => {
    const response = await axios.get<CasesPaginationResponse>(
      `${API_URL}/api/cases`,
      {
        headers: {
          client_id: CLIENT_ID,
          token: CLIENT_TOKEN,
        },
        params: {
          page: 0,
          limit: 10,
        },
      },
    );

    return response.data;
  });
}
