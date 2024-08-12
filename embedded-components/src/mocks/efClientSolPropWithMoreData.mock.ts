import { ClientResponse } from '@/api/generated/embedded-banking.schemas';

export const efClientSolPropWithMoreData: ClientResponse = {
  id: '0030000129',
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
      email: 'monica@cpbakes.com',
      roles: ['CLIENT'],
      profileStatus: 'NEW',
      status: 'ACTIVE',
      createdAt: '2023-10-31T00:20:09.401Z',
      organizationDetails: {
        organizationType: 'SOLE_PROPRIETORSHIP',
        organizationName: "Monica's bakehouse",
        dbaName: '',
        organizationDescription: `Artisan Bakery offering freshly baked 
        cookies and pastries made with locally sourced 
        ingredients, delivering a taste of home in every 
        bite!`,
        industryCategory: 'Manufacturing',
        industryType: 'Retail Bakeries',
        countryOfFormation: 'US',
        yearOfFormation: '2023',
        significantOwnership: true,
        entitiesInOwnership: false,
        addresses: [
          {
            addressType: 'BUSINESS_ADDRESS',
            addressLines: ['90 Bedford Street', 'Suite 2'],
            city: 'New York',
            state: 'NY',
            postalCode: '10014',
            country: 'US',
          },
          {
            addressType: 'MAILING_ADDRESS',
            addressLines: ['80 Bedford Street'],
            city: 'Jersey City',
            state: 'NJ',
            postalCode: '07302',
            country: 'US',
          },
        ],
        phone: {
          phoneType: 'BUSINESS_PHONE',
          countryCode: '+1',
          phoneNumber: '6316215110',
        },
        organizationIds: [
          {
            idType: 'EIN',
            issuer: 'US',
            value: '00-0000001',
            expiryDate: '2023-10-31',
            description: 'EIN',
          },
        ],
        jurisdiction: 'US',
        websiteAvailable: true,
        website: 'https://www.example.com',
      },
    },
    {
      id: '2000000112',
      partyType: 'INDIVIDUAL',
      parentPartyId: '2000000111',
      parentExternalId: 'TCU1234',
      externalId: 'TCU12344',
      email: 'monica@cpbakes.com',
      profileStatus: 'APPROVED',
      status: 'ACTIVE',
      createdAt: '2023-10-31T00:20:09.401Z',
      roles: ['CONTROLLER', 'BENEFICIAL_OWNER', 'DECISION_MAKER'],
      individualDetails: {
        firstName: 'Monica',
        lastName: 'Gellar',
        countryOfResidence: 'US',
        natureOfOwnership: 'Direct',
        jobTitle: 'Other',
        jobTitleDescription: 'CEO',
        soleOwner: true,
        birthDate: '1990-01-01',
        phone: {
          phoneType: 'BUSINESS_PHONE',
          countryCode: '+1',
          phoneNumber: '6316215110',
        },
        addresses: [
          {
            addressType: 'RESIDENTIAL_ADDRESS',
            addressLines: ['90 Bedford Street', 'Suite 2'],
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
            value: '100010001',
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
    partyIds: ['2000000112'],
    partyRoles: [],
    questionIds: [
      '30005',
      '30026',
      '30027',
      '30069',
      '30070',
      '30071',
      '30072',
      '30073',
    ],
  },
  questionResponses: [],
  status: 'NEW',
};
