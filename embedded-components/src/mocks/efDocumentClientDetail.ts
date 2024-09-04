import { ListDocumentsResponse } from '@/api/generated/smbdos';

export const efDocumentClientDetail: ListDocumentsResponse = {
  metadata: {
    total: 1,
    page: 0,
    limit: 1,
  },
  documentDetails: [
    {
      id: '62c864d9-9ec6-42a6-8856-5a3021d3e044',
      documentType: 'TERMS_CONDITIONS',
      metadata: [
        {
          key: 'DOCUMENT_REQUEST_ID',
          value: '50185',
        },
        {
          key: 'FILE_EXTENSION',
          value: 'pdf',
        },
        {
          key: 'UPLOAD_TIME',
          value: '1701296820778',
        },
        {
          key: 'COUNTRY',
          value: 'US',
        },
        {
          key: 'STATUS',
          value: 'NEW',
        },
      ],
    },
  ],
};
