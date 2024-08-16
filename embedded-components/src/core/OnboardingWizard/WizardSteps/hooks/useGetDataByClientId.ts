import { useEffect } from 'react';

import { useSmbdoGetClient } from '@/api/generated/embedded-banking';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';

import { useError } from '../../context/error.context';

const useGetDataByClientId = () => {
  const { setError, setPending } = useError();
  const { clientId, setPartyId } = useRootConfig();

  const { data, refetch, isPending, isError, error } = useSmbdoGetClient(
    clientId as string
  );

  useEffect(() => {
    if (isError) {
      setError(error);
    }

    setPending(isPending);
  }, [isError, isPending]);

  //TODO: Make sure there is no collision of this partyId
  setPartyId(data?.partyId);

  return { data, refetch, isPending, isError, error };
};

export { useGetDataByClientId };
