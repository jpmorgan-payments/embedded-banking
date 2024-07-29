import { useSmbdoGetClient } from '@/api/generated/embedded-banking';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';

const useGetDataByClientId = (screeName: 'review' | 'client' = 'review') => {
  const { clientId, mockSteps, isMockResponse, setPartyId, mockData, isMock } =
    useRootConfig();

  const { data, refetch, isPending } = isMockResponse
    ? { data: mockSteps[screeName], refetch: () => null, isPending: false }
    : isMock
      ? { data: mockData, refetch: () => null, isPending: false }
      : useSmbdoGetClient(clientId as string);

  //TODO: Make sure there is no collision of this partyId
  setPartyId(data?.partyId);

  return { data, refetch, isPending };
};

export { useGetDataByClientId };
