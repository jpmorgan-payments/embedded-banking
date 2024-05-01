import axios, { AxiosError } from 'axios';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { DocumentDetails, DocumentUploadData } from '../generated-api-models';
import { useApiConfig } from './useApiConfig';

//TODO - define a type
export type DocumentUploadRequestType = {
  file: File | string;
  documentData: DocumentUploadData;
};

export function useUploadDocuments(): UseMutationResult<
  DocumentDetails[],
  AxiosError,
  DocumentUploadRequestType[]
> {
  const queryClient = useQueryClient();

  const { config } = useApiConfig();

  return useMutation(
    ['uploadDocument', config],
    async (createDocumentRequestBody: DocumentUploadRequestType[]) => {
      const promiseArray: any = [];
      createDocumentRequestBody.forEach((ele) => {
        const tempData = new FormData();
        tempData.append('file', ele.file);
        const jsonString = JSON.stringify(ele.documentData);
        const blob = new Blob([jsonString], { type: 'application/json' });
        tempData.append('documentData', blob);
        promiseArray.push(
          axios.post<DocumentDetails>(`/documents`, tempData, config),
        );
      });
      const result = await Promise.all(promiseArray);
      return result;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['clientVerifications']);
      },
    },
  );
}
