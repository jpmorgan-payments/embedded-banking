import { useEffect } from 'react';

import { useSmbdoGetClient } from '@/api/generated/smbdo';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';

import { useError } from '../../context/error.context';

const useGetDataByClientId = () => {
  const { setError, setPending, setRefetch } = useError();
  const { clientId } = useRootConfig();

  const {
    data,
    refetch,
    isPending,
    isError,
    error,
    isLoading,
    status,
    refetch: refetchClient,
  } = useSmbdoGetClient(clientId ?? '', {
    query: {
      enabled: !!clientId,
      retry: (failureCount, err) => {
        // If the err status is 404, don't retry
        if (err.response && err.response.status === 404) {
          return false;
        }

        // Otherwise, retry up to a maximum of 3 times
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: Infinity,
    },
  });

  useEffect(() => {
    if (isError) {
      setError(error);
    }

    if (refetchClient) {
      setRefetch(refetchClient);
    }

    setPending(isPending);
  }, [isError, isPending, refetchClient]);

  //TODO: Make sure there is no collision of this partyId
  // setPartyId(data?.partyId);

  return { data, refetch, isPending, isError, error, isLoading, status };
};

export { useGetDataByClientId };
