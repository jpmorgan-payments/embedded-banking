import axios, { AxiosError } from 'axios';
import { useQueries, useQuery, type UseQueryResult } from '@tanstack/react-query';
import { API_URL, CLIENT_ID, CLIENT_TOKEN } from 'data/constants';

import type { AccountBalanceResponse } from 'generated-api-models';

const fetchBalance = async (accountId?: string) => {
  const response = await axios.get<AccountBalanceResponse>(
    `${API_URL}/api/accounts/${accountId}/balances`,
    {
      headers: {
        client_id: CLIENT_ID,
        token: CLIENT_TOKEN,
      },
    },
  );

  return response.data;
};

export function useAccountBalance(
  accountId?: string,
): UseQueryResult<AccountBalanceResponse, AxiosError> {
  return useQuery(['balance', accountId], () => fetchBalance(accountId), {
    enabled: !!accountId,
  });
}

export function useAccountBalanceList(
  accountIdList: string[],
): UseQueryResult<AccountBalanceResponse>[] {
  return useQueries({
    queries: accountIdList.map((accountId) => ({
      queryKey: ['balance', accountId],
      queryFn: () => fetchBalance(accountId),
      enabled: !!accountId,
    })),
  });
}
