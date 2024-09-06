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
