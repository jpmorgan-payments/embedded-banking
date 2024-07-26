import {
  useSmbdoGetClient,
  useSmbdoListQuestions,
} from '@/api/generated/embedded-banking';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';

const useGetQuestions = (questionsIds: string[]) => {
  const {
    clientId,
    mockSteps,
    isMockResponse,
    setPartyId,
    mockData,
    isMock,
    mockQuestions,
  } = useRootConfig();

  const { data, refetch, isPending, isSuccess } = isMock
    ? {
        data: mockQuestions,
        refetch: () => null,
        isPending: false,
        isSuccess: true,
      }
    : useSmbdoListQuestions({
        questionIds: questionsIds?.join(','),
      });

  return { data, refetch, isPending, isSuccess };
};

export { useGetQuestions };
