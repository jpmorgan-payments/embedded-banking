const q = [
  {
    contentKey: 'totalAnnualRevenueInteger',
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
      type: 'array',
      minItems: 1,
      maxItems: 1,
      items: {
        type: 'integer',
      },
    },
    subQuestions: [],
  },
  {
    contentKey: 'VendorsOrSuppliersForCubaIranNKoreaCrimeaYesNo',
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
      type: 'array',
      minItems: 1,
      maxItems: 1,
      items: {
        type: 'boolean',
      },
    },
    subQuestions: [
      {
        anyValuesMatch: 'true',
        questionIds: ['30027'],
      },
    ],
  },
  {
    contentKey: 'listCountriesVendorsSuppliersBoolean',
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
      type: 'array',
      minItems: 1,
      maxItems: 1,
      items: {
        type: 'string',
      },
    },
    subQuestions: [],
  },
];

export { q };
