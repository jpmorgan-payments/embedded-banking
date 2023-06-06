import axios, { AxiosError } from 'axios';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { API_URL, CLIENT_TOKEN } from 'data/constants';

import type { JobTitles } from 'generated-api-models';

export function useJobTitles(): UseQueryResult<JobTitles, AxiosError> {
  return useQuery(['jobTitles'], async () => {
    const response = await axios.get<JobTitles>(`${API_URL}/api/job-titles`, {
      headers: { token: CLIENT_TOKEN },
    });

    return response.data;
  });
}
