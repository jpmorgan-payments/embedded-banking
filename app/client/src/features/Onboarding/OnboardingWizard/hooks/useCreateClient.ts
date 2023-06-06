import axios, { AxiosError } from 'axios';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { API_URL, PLATFORM_ID, CLIENT_TOKEN } from 'data/constants';

import type {
  CreateClientRequest,
  ClientInformationResponse,
} from 'generated-api-models';

export function useCreateClient(): UseMutationResult<
  ClientInformationResponse,
  AxiosError,
  CreateClientRequest,
  () => void
> {
  return useMutation(['createClient'], async (createClientRequestBody) => {
    const response = await axios.post<ClientInformationResponse>(
      `${API_URL}/api/clients`,
      createClientRequestBody,
      {
        headers: {
          platform_id: PLATFORM_ID,
          token: CLIENT_TOKEN,
        },
      },
    );

    return response.data;
  });
}
