import { useSmbdoGetClient } from '@/api/generated/embedded-banking';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';

const useGetDataByClientId = (screeName: 'review' | 'client' = 'review') => {
  const { clientId, mockSteps, isMockResponse } = useRootConfig();

  const { data, refetch, isPending } = isMockResponse
    ? { data: mockSteps[screeName], refetch: () => null, isPending: false }
    : useSmbdoGetClient(clientId as string);

  return { data, refetch, isPending };
};

export { useGetDataByClientId };
