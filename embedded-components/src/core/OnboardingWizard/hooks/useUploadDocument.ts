import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import {
 smbdoGetDocumentDetail
} from '@/api/generated/embedded-banking';

import { useApiConfig } from './useApiConfig';

//TODO - define a type
export type DocumentUploadRequestType = {
  file: File | null;
  documentData: DocumentUploadData;
};

export function useUploadDocument(): UseMutationResult<
  DocumentDetails,
  AxiosError,
  DocumentUploadRequestType
> {
  const { config } = useApiConfig();

  return useMutation(
    ['uploadDocument', config],
    async (createDocumentUploadRequestBody: DocumentUploadRequestType) => {
      const response = smbdoGetDocumentDetail
      const response = await axios.post<DocumentDetails>(
        `/documents`,
        createDocumentUploadRequestBody,
        config
      );

      return response.data;
    }
  );
}
