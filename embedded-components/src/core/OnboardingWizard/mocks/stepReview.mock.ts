export const stepReviewMockNoQuestions = {
  id: '3000000265',
  attestations: [
    {
      attesterFullName: 'Monica Gellar',
      attestationTime: '2023-10-19T12:28:11.232Z',
      documentId: '62d29548-f55a-458e-b9bb-ed32a6a05a1b',
      ipAddress: '1.1.1.1',
    },
  ],
  parties: [
    {
      id: '2000000111',
      partyType: 'ORGANIZATION',
      externalId: 'TCU1234',
      email: 'monica@cpgetaways.com',
      roles: ['CLIENT'],
      profileStatus: 'APPROVED',
      status: 'ACTIVE',
      createdAt: '2024-06-21T18:12:21.005Z',
      organizationDetails: {
        organizationType: 'SOLE_PROPRIETORSHIP',
        organizationName: 'Central Park Getaways',
        dbaName: 'CP Getaways',
        organizationDescription:
          'Relax, unwind and experience the comforting charm of our apartment while exploring New York',
        industryCategory: 'Accommodation and Food Services',
        industryType: 'All Other Traveler Accommodation',
        countryOfFormation: 'US',
        yearOfFormation: '2023',
        significantOwnership: true,
        entitiesInOwnership: false,
        addresses: [
          {
            addressType: 'BUSINESS_ADDRESS',
            addressLines: ['90 Bedford Street', 'Apt 2E'],
            city: 'New York',
            state: 'NY',
            postalCode: '10014',
            country: 'US',
          },
        ],
        phone: {
          phoneType: 'BUSINESS_PHONE',
          countryCode: 'US',
          phoneNumber: '6316215110',
        },
        organizationIds: [
          {
            idType: 'EIN',
            issuer: 'US',
            value: '00-0000001',
          },
        ],
        websiteAvailable: false,
      },
    },
    {
      id: '2000000112',
      partyType: 'INDIVIDUAL',
      parentPartyId: '2000000111',
      parentExternalId: 'TCU1234',
      externalId: 'TCU12344',
      email: 'monica@cpgetaways.com',
      profileStatus: 'APPROVED',
      status: 'ACTIVE',
      createdAt: '2024-06-21T18:12:21.005Z',
      roles: ['CONTROLLER', 'BENEFICIAL_OWNER'],
      individualDetails: {
        firstName: 'Monica',
        lastName: 'Gellar',
        countryOfResidence: 'US',
        natureOfOwnership: 'Direct',
        jobTitle: 'Other',
        jobTitleDescription: 'CEO',
        soleOwner: true,
        addresses: [
          {
            addressType: 'RESIDENTIAL_ADDRESS',
            addressLines: ['90 Bedford Street', 'Apt 2E'],
            city: 'New York',
            state: 'NY',
            postalCode: '10014',
            country: 'US',
          },
        ],
        individualIds: [
          {
            idType: 'SSN',
            issuer: 'US',
            value: '100-01-0001',
          },
        ],
      },
    },
  ],
  partyId: '2000000111',
  products: ['EMBEDDED_PAYMENTS'],
  outstanding: {
    attestationDocumentIds: [],
    documentRequestIds: [],
    partyIds: [],
    partyRoles: [],
    questionIds: [],
  },
  questionResponses: [],
  status: 'APPROVED',
};

export const stepReviewMockWithQuestions = {
  id: '3000000265',
  attestations: [
    {
      attesterFullName: 'Monica Gellar',
      attestationTime: '2023-10-19T12:28:11.232Z',
      documentId: '62d29548-f55a-458e-b9bb-ed32a6a05a1b',
      ipAddress: '1.1.1.1',
    },
  ],
  parties: [
    {
      id: '2000000111',
      partyType: 'ORGANIZATION',
      externalId: 'TCU1234',
      email: 'monica@cpgetaways.com',
      roles: ['CLIENT'],
      profileStatus: 'APPROVED',
      status: 'ACTIVE',
      createdAt: '2024-06-21T18:12:21.005Z',
      organizationDetails: {
        organizationType: 'SOLE_PROPRIETORSHIP',
        organizationName: 'Central Park Getaways',
        dbaName: 'CP Getaways',
        organizationDescription:
          'Relax, unwind and experience the comforting charm of our apartment while exploring New York',
        industryCategory: 'Accommodation and Food Services',
        industryType: 'All Other Traveler Accommodation',
        countryOfFormation: 'US',
        yearOfFormation: '2023',
        significantOwnership: true,
        entitiesInOwnership: false,
        addresses: [
          {
            addressType: 'BUSINESS_ADDRESS',
            addressLines: ['90 Bedford Street', 'Apt 2E'],
            city: 'Brooklyn',
            state: 'NY',
            postalCode: '10014',
            country: 'US',
          },
        ],
        phone: {
          phoneType: 'BUSINESS_PHONE',
          countryCode: 'US',
          phoneNumber: '6316215110',
        },
        organizationIds: [
          {
            idType: 'EIN',
            issuer: 'US',
            value: '43-5248961',
          },
        ],
        websiteAvailable: false,
      },
    },
    {
      id: '2000000112',
      partyType: 'INDIVIDUAL',
      parentPartyId: '2000000111',
      parentExternalId: 'TCU1234',
      externalId: 'TCU12344',
      email: 'monica@cpgetaways.com',
      profileStatus: 'APPROVED',
      status: 'ACTIVE',
      createdAt: '2024-06-21T18:12:21.005Z',
      roles: ['CONTROLLER', 'BENEFICIAL_OWNER'],
      individualDetails: {
        firstName: 'Monica',
        lastName: 'Gellar',
        countryOfResidence: 'US',
        natureOfOwnership: 'Direct',
        jobTitle: 'CEO',
        jobTitleDescription: null,
        soleOwner: true,
        birthDate: '1983-02-08',
        addresses: [
          {
            addressType: 'RESIDENTIAL_ADDRESS',
            addressLines: ['90 Bedford Street', 'Apt 2E'],
            city: 'Brooklyn',
            state: 'NY',
            postalCode: '10014',
            country: 'US',
          },
        ],
        individualIds: [
          {
            idType: 'SSN',
            issuer: 'US',
            value: '078-86-6616',
          },
        ],
        phone: {
          phoneType: 'MOBILE_PHONE',
          countryCode: 'US',
          phoneNumber: '6316215110',
        },
      },
    },
    {
      id: '2000000113',
      partyType: 'INDIVIDUAL',
      parentPartyId: '2000000111',
      parentExternalId: 'TCU1234',
      externalId: 'TCU12344',
      email: 'maryjamessue@fake.website',
      profileStatus: 'APPROVED',
      status: 'ACTIVE',
      createdAt: '2024-06-21T18:12:21.005Z',
      roles: ['BENEFICIAL_OWNER'],
      individualDetails: {
        firstName: 'Mary',
        lastName: 'Sue',
        countryOfResidence: 'US',
        natureOfOwnership: 'Direct',
        jobTitle: 'COO',
        jobTitleDescription: null,
        soleOwner: true,
        birthDate: '1983-03-03',
        addresses: [
          {
            addressType: 'RESIDENTIAL_ADDRESS',
            addressLines: ['2468 Real Ave', 'Apt 2E', 'Suit 2E'],
            city: 'New York',
            state: 'NY',
            postalCode: '10014',
            country: 'US',
          },
        ],
        individualIds: [
          {
            idType: 'SSN',
            issuer: 'US',
            value: '394-94-3213',
          },
        ],
        phone: {
          phoneType: 'MOBILE_PHONE',
          countryCode: 'US',
          phoneNumber: '2017700500',
        },
      },
    },
  ],
  partyId: '2000000111',
  products: ['EMBEDDED_PAYMENTS'],
  outstanding: {
    attestationDocumentIds: [],
    documentRequestIds: [],
    partyIds: [],
    partyRoles: [],
    questionIds: ['30005', '30026', '30027'],
  },
  questionResponses: [],
  status: 'NEW',
};

export const stepReviewMockWithAttestations = {
  attestations: [],
  entityCategory: 'OPCO',
  parties: [
    {
      id: '2000001195',
      createdAt: '2024-06-25T15:26:50.472Z',
      email: 'aleshintsev@gmail.com',
      partyType: 'ORGANIZATION',
      platformId: '6000000001',
      profileStatus: 'INFORMATION_REQUESTED',
      roles: ['CLIENT'],
      active: true,
      status: 'ACTIVE',
      organizationDetails: {
        countryOfFormation: 'US',
        organizationName: 'Tester LL',
        organizationType: 'LIMITED_LIABILITY_COMPANY',
        organizationIds: [],
        significantOwnership: false,
        websiteAvailable: false,
      },
      validationResponse: [
        {
          validationStatus: 'NEEDS_INFO',
          validationType: 'ENTITY_VALIDATION',
          fields: [
            {
              name: 'naics',
            },
          ],
        },
      ],
    },
    {
      id: '2000001196',
      createdAt: '2024-06-25T15:26:50.869Z',
      email: 'aleshintsev@gmail.com',
      partyType: 'INDIVIDUAL',
      parentPartyId: '2000001195',
      platformId: '6000000001',
      profileStatus: 'NEW',
      roles: ['CONTROLLER'],
      active: true,
      status: 'ACTIVE',
      individualDetails: {
        countryOfResidence: 'US',
        firstName: 'Andrey',
        lastName: 'Aleshintsev',
        individualIds: [],
      },
    },
  ],
  questionResponses: [
    {
      questionId: '30005',
      values: ['1234'],
    },
    {
      questionId: '30026',
      values: ['false'],
    },
  ],
  productConfiguration: [],
  createdAt: '2024-06-25T15:26:51.183Z',
  id: '3000000335',
  partyId: '2000001195',
  products: ['EMBEDDED_PAYMENTS'],
  outstanding: {
    attestationDocumentIds: ['1e7df4ff-0c22-4974-bbdf-983d05755de3'],
    documentRequestIds: [],
    questionIds: [],
    partyRoles: [],
    partyIds: ['2000001195'],
  },
  status: 'NEW',
  results: {
    customerIdentityStatus: 'NOT_STARTED',
  },
};
