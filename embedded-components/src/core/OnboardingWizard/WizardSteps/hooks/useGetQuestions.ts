import { useSmbdoListQuestions } from '@/api/generated/smbdo';

const useGetQuestions = (questionsIds: string[]) => {
  const { data, refetch, isPending, isSuccess } = useSmbdoListQuestions({
    questionIds: questionsIds?.join(','),
  });

  return { data, refetch, isPending, isSuccess };
};

export { useGetQuestions };
