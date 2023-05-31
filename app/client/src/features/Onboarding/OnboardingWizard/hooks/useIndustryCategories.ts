import axios, { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { API_URL, CLIENT_TOKEN } from 'data/constants';

import type { IndustryCategoriesReponse } from 'generated-api-models';

export function useIndustryCategories(): UseQueryResult<
  IndustryCategoriesReponse,
  AxiosError
> {
  return useQuery(['industryCategories'], async () => {
    const response = await axios.get<IndustryCategoriesReponse>(
      `${API_URL}/api/industry-categories`,
      {
        headers: { token: CLIENT_TOKEN },
        params: {
          page: 0,
          limit: 25,
        },
      },
    );

    return response.data;
  });
}
