import axios, { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { API_URL, CLIENT_ID } from 'data/constants';

import type { ClientInformationResponse } from 'generated-api-models';

export function useClient(): UseQueryResult<
  ClientInformationResponse,
  AxiosError
> {
  return useQuery(['client'], async () => {
    const response = await axios.get<ClientInformationResponse>(
      `${API_URL}/api/client/${CLIENT_ID}`,
    );

    return response.data;
  });
}
