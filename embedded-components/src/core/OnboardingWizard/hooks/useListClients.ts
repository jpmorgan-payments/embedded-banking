import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';


export function useListClients(
  platformId: string
): UseQueryResult<any, AxiosError> {
  const config = {
    baseUrl: 'https://smbdo-api-uat.test.aws.jpmchase.net/clients',
    headers: {
      'x-platform-id': platformId,
    },
  };
  return useQuery(['clients', config], async () => {
    const response = await axios.get<any>(`/clients`, config)
    return response.data;
  });
}
