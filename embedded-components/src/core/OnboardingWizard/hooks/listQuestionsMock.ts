export const listQuestionsMock = {
  questions: [
    {
      contentKey: 'individualCashFlowDeclaration',
      content: [
        {
          description:
            'Individuals must additionally provide info regarding cash flow.',
          label: 'Will you perform cash transactions?',
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
      contentKey: 'individualCashFlowSource',
      content: [
        {
          description:
            'Individual must additionally provide info regarding cash flow.',
          label:
            'If yes, will they exceed US$xx in aggregate on a monthly basis?',
          locale: 'en-US',
        },
      ],
      defaultLocale: 'en-US',
      description:
        'Individual must additionally provide info regarding cash flow.',
      id: '300002',
      parentQuestionId: '300001',
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
    total: 2,
  },
};
