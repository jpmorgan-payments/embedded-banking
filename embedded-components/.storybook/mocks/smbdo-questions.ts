export const questionListMock = {
  questions: [
    {
      content: [
        {
          label: 'Will you perform cash transactions?',
          description:
            'Individuals must additionally provide info regarding cash flow.',
          locale: 'en-US',
        },
      ],
      defaultLocale: 'en-US',
      description:
        'Individuals must additionally provide info regarding cash flow.',
      id: '300001',
      responseSchema: {
        type: 'array',
        items: {
          type: 'boolean',
        },
        minItems: 1,
        maxItems: 1,
      },
      subQuestions: [
        {
          anyValuesMatch: 'true',
          questionIds: ['300002'],
        },
      ],
    },
    {
      content: [
        {
          label:
            'If yes, will they exceed US$xx in aggregate on a monthly basis?',
          description:
            'Individuals must additionally provide info regarding cash flow.',
          locale: 'en-US',
        },
      ],
      defaultLocale: 'en-US',
      description:
        'Individuals must additionally provide info regarding cash flow.',
      id: '300002',
      responseSchema: {
        type: 'array',
        items: {
          type: 'string',
        },
        minItems: 1,
        maxItems: 1,
      },
      subQuestions: [],
    },
    {
      content: [
        {
          label: 'Purpose of the account(s):',
          description: 'The purpose of the account(s) must be provided.',
          locale: 'en-US',
        },
      ],
      defaultLocale: 'en-US',
      description: 'The purpose of the account(s) must be provided.',
      id: '300003',
      responseSchema: {
        type: 'array',
        items: {
          type: 'string',
        },
        minItems: 1,
        maxItems: 1,
      },
      subQuestions: [],
    },
  ],
  metadata: {
    page: 0,
    limit: 25,
    total: 3,
  },
};
