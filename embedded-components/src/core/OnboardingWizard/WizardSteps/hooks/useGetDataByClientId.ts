import { useEffect } from 'react';

import { useSmbdoGetClient } from '@/api/generated/embedded-banking';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';

import { useError } from '../../context/error.context';

const useGetDataByClientId = (screeName: 'review' | 'client' = 'review') => {
  const { setError } = useError();
  const { clientId, mockSteps, isMockResponse, setPartyId, mockData, isMock } =
    useRootConfig();

  const { data, refetch, isPending, isError, error } = isMockResponse
    ? {
        data: mockSteps[screeName],
        refetch: () => null,
        isPending: false,
        isError: false,
        error: false,
      }
    : isMock
      ? {
          data: mockData,
          refetch: () => null,
          isPending: false,
          isError: false,
          error: false,
        }
      : useSmbdoGetClient(clientId as string);

  useEffect(() => {
    if (isError) {
      setError(error);
    }
  }, [isError]);

  //TODO: Make sure there is no collision of this partyId
  setPartyId(data?.partyId);

  return { data, refetch, isPending, isError };
};

export { useGetDataByClientId };
