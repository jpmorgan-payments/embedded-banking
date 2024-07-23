import { useSmbdoGetClient } from '@/api/generated/embedded-banking';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';

import { useOnboardingForm } from '../../context/form.context';

const useGetDataByClientId = (screeName: 'review' | 'client' = 'review') => {
  const { onboardingForm } = useOnboardingForm();

  const { clientId, mockSteps, isMockResponse } = useRootConfig();

  const { data, refetch, isPending } = isMockResponse
    ? { data: mockSteps[screeName], refetch: () => null, isPending: false }
    : useSmbdoGetClient((clientId || onboardingForm?.id) as string);

  return { data, refetch, isPending };
};

export { useGetDataByClientId };
