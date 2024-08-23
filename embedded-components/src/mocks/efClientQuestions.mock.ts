export const efClientQuestionsMock = {
  metadata: { page: 0, total: 8 },
  questions: [
    {
      content: [
        {
          description: 'What is your Total Annual Revenue in local currency?',
          label: 'Total annual revenue/income:',
          locale: 'en-US',
        },
      ],
      defaultLocale: 'en-US',
      description: 'What is your Total Annual Revenue in local currency?',
      id: '30005',
      responseSchema: {
        type: 'ARRAY',
        minItems: 1,
        maxItems: 1,
        items: { type: 'INTEGER' },
      },
      subQuestions: [],
    },
    {
      content: [
        {
          description:
            'Do you have locations, sell goods, or services, or have vendors or suppliers in countries or regions subject to comprehensive sanctions programs (Iran, North Korea, Cuba, Syria and the Crimea, Donetsk, Luhansk Regions of Ukraine), or work with Sanctioned Parties in Russia or Venezuela?',
          label:
            'Do you have locations, sell goods, or services, or have vendors or suppliers in countries or regions subject to comprehensive sanctions programs (Iran, North Korea, Cuba, Syria and the Crimea, Donetsk, Luhansk Regions of Ukraine), or work with Sanctioned Parties in Russia or Venezuela?',
          locale: 'en-US',
        },
      ],
      defaultLocale: 'en-US',
      description:
        'Do you have locations, sell goods, or services, or have vendors or suppliers in countries or regions subject to comprehensive sanctions programs (Iran, North Korea, Cuba, Syria and the Crimea, Donetsk, Luhansk Regions of Ukraine), or work with Sanctioned Parties in Russia or Venezuela?',
      id: '30026',
      responseSchema: {
        type: 'ARRAY',
        minItems: 1,
        maxItems: 1,
        items: { type: 'BOOLEAN' },
      },
      subQuestions: [{ anyValuesMatch: 'true', questionIds: ['30027'] }],
    },
    {
      content: [
        {
          description: 'If so, select which ones (multiple possible)',
          label: 'If so, select which ones (multiple possible)',
          locale: 'en-US',
        },
      ],
      defaultLocale: 'en-US',
      description: 'If so, select which ones (multiple possible)',
      id: '30027',
      parentQuestionId: '30026',
      responseSchema: {
        type: 'ARRAY',
        minItems: 1,
        maxItems: 1,
        items: {
          type: 'STRING',
          enum: [
            'Iran',
            'North Korea',
            'Cuba',
            'Syria',
            'Crimea',
            'Donetsk',
            'Luhansk Regions of Ukraine',
          ],
        },
      },
      subQuestions: [],
    },
    {
      content: [
        {
          description: 'Is the customer licensed and/or registered?',
          label: 'Is the customer licensed and/or registered?',
          locale: 'en-US',
        },
      ],
      defaultLocale: 'en-US',
      description: 'Is the customer licensed and/or registered?',
      id: '30069',
      responseSchema: {
        type: 'ARRAY',
        minItems: 1,
        maxItems: 2,
        items: { type: 'STRING', enum: ['Licensed', 'Registered', 'None'] },
      },
      subQuestions: [
        {
          anyValuesMatch: 'Licensed',
          questionIds: ['30071', '30070'],
        },
        { anyValuesMatch: 'Registered', questionIds: ['30073', '30072'] },
      ],
    },
    {
      content: [
        {
          description: 'What is the country of License?',
          label: 'What is the country of License?',
          locale: 'en-US',
        },
      ],
      defaultLocale: 'en-US',
      description: 'What is the country of License?',
      id: '30070',
      parentQuestionId: '30069',
      responseSchema: {
        type: 'ARRAY',
        minItems: 1,
        maxItems: 1,
        items: { type: 'STRING' },
      },
      subQuestions: [],
    },
    {
      content: [
        {
          description: 'What is the date of License?',
          label: 'What is the date of License?',
          locale: 'en-US',
        },
      ],
      defaultLocale: 'en-US',
      description: 'What is the date of License?',
      id: '30071',
      parentQuestionId: '30069',
      responseSchema: {
        type: 'ARRAY',
        minItems: 1,
        maxItems: 1,
        items: { type: 'STRING' },
      },
      subQuestions: [],
    },
    {
      content: [
        {
          description: 'What is the country of registration?',
          label: 'What is the country of registration?',
          locale: 'en-US',
        },
      ],
      defaultLocale: 'en-US',
      description: 'What is the country of registration?',
      id: '30072',
      parentQuestionId: '30069',
      responseSchema: {
        type: 'ARRAY',
        minItems: 1,
        maxItems: 1,
        items: { type: 'STRING' },
      },
      subQuestions: [],
    },
    {
      content: [
        {
          description: 'What is the date of registration?',
          label: 'What is the date of registration?',
          locale: 'en-US',
        },
      ],
      defaultLocale: 'en-US',
      description: 'What is the date of registration?',
      id: '30073',
      parentQuestionId: '30069',
      responseSchema: {
        type: 'ARRAY',
        minItems: 1,
        maxItems: 1,
        items: { type: 'STRING' },
      },
      subQuestions: [],
    },
  ],
};