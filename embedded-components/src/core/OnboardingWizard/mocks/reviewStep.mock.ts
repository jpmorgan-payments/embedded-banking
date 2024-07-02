const verificationsMock = [
  {
    verification: {
      id: 'A01021',
      label:
        'We plan to offer cash transaction in the near future. In order to enable on your account, we will need to collect a few more details. You will be notified as soon as the feature is available: Will your business use the account to perform cash transactions?',
    },
    response: {
      values: ['FALSE'],
      updatedDateTime: '2023-06-07T12:35:52',
      format: 'single',
      maxLength: 255,
      answerOptions: [
        {
          id: 'FALSE',
          label: 'No',
        },
        {
          id: 'TRUE',
          label: 'Yes',
        },
      ],
    },
  },
  {
    verification: {
      id: 'A00033',
      label:
        'Will there be any seasonal volume and value threshold fluctuations from the expected average monthly activity? If yes, please describe including causes and timing.',
    },
    response: {
      values: ['TRUE'],
      updatedDateTime: '2023-06-07T12:35:52',
      format: 'single',
      maxLength: 255,
      answerOptions: [
        {
          id: 'FALSE',
          label: 'No',
        },
        {
          id: 'TRUE',
          label: 'Yes',
        },
      ],
    },
  },
  {
    verification: {
      id: 'A01147',
      label: 'Is the Total Annual Revenue field an estimate or actual value?',
    },
    response: {
      values: ['ESTIMATE'],
      updatedDateTime: '2023-06-07T12:35:52',
      format: 'single',
      maxLength: 255,
      answerOptions: [
        {
          id: 'ESTIMATE',
          label: 'Estimate',
        },
        {
          id: 'ACTUAL',
          label: 'Actual',
        },
      ],
    },
  },
  {
    verification: {
      id: 'A01334',
      label: 'What currency is the Total Annual Revenue in?',
    },
    response: {
      values: ['USD'],
      updatedDateTime: '2023-06-07T12:35:52',
      format: 'list',
      maxLength: 255,
      answerOptions: [
        {
          id: 'USD',
          label: 'USD',
        },
      ],
    },
  },
  {
    verification: {
      id: 'A00092',
      label: 'What is the Total Annual Revenue amount?',
    },
    response: {
      values: ['1000'],
      updatedDateTime: '2023-06-07T12:35:52',
      format: 'numeric',
      maxLength: 255,
    },
  },
  {
    verification: {
      id: 'A00034',
      label: 'Please describe',
    },
    response: {
      values: ['It is a busy world'],
      updatedDateTime: '2023-06-07T12:35:52',
      format: 'string',
      parentId: 'A00033',
      maxLength: 2000,
    },
  },
  {
    verification: {
      id: 'A00043',
      label:
        'Do you have any operations, vendors, suppliers or sell goods or services in, or support other activities directly or indirectly relating to Cuba, Iran, Syria, North Korea or Crimea?',
    },
    response: {
      values: ['CU'],
      updatedDateTime: '2023-06-07T12:35:52',
      format: 'single',
      maxLength: 255,
      answerOptions: [
        {
          id: 'CU',
          label: 'Cuba',
        },
        {
          id: 'KP',
          label: 'North Korea',
        },
        {
          id: 'IR',
          label: 'Iran',
        },
        {
          id: 'SY',
          label: 'Syria',
        },
        {
          id: 'XX',
          label: 'Crimea',
        },
      ],
    },
  },
];

const controllerMock = {
  firstName: 'Mary',
  middleName: 'James',
  lastName: 'Sue',
  jobTitle: 'COO',
  email: 'maryjamessue@fake.website',
  addressLine1: '2468 Real Ave',
  city: 'New Fake City',
  state: 'NY',
  zip: '24680',
  phone: '2017700500',
  birthDate: '1933-03-03T05:00:00.000Z',
  ssn9: '394943213',
};
const businessDetailsMock = {
  businessName: 'A Fake LLC',
  businessAliasName: 'ZZ',
  businessEmail: 'ceo@fake.website',
  ein: '123456789',
  businessDescription: 'We do stuff',
  businessAddressLine1: '123 Business Street',
  businessAddressLine2: '',
  businessAddressLine3: '',
  businessCity: 'Companytown',
  businessState: 'NY',
  businessZipCode: '12345',
  businessPhone: '2017700500',
  website: '',
  websiteNotAvailable: true,
  industryCategory: 'Accommodation and Food Services',
  industryType: 'Caterers',
  yearOfFormation: 2000,
  businessIdentification: 'ein',
  controllerIsOwner: 'yes',
};
const formCompleteMock = {
  controllerBirthDate: '1984-07-23T04:00:00.000Z',
  controllerPhone: '2017700500',
  controllerZipCode: '10101',
  controllerState: 'NJ',
  controllerCity: 'Fakecity',
  controllerAddressLine3: '',
  controllerAddressLine2: '',
  controllerAddressLine1: '456 Controller Road',
  controllerSsn9: '123456789',
  controllerJobTitle: 'CEO',
  controllerJobTitleDescription: 'Chief Chef',
  controllerEmail: 'johndoe@fake.website',
  controllerLastName: 'Doe',
  controllerMiddleName: '',
  controllerFirstName: 'John',
  controllerId: 'e9f08f14-f929-48a6-a6b7-2096ab41d94a',
  legalStructure: 'Limited Liability Company',
  significantOwnership: false,
  businessName: 'A Fake Company, LLC',
  businessAliasName: '',
  businessEmail: '',
  ein: '123456789',
  businessDescription: 'We do stuff.',
  businessAddressLine1: '123 Business Street',
  businessAddressLine2: '',
  businessAddressLine3: '',
  businessCity: 'Companytown',
  businessState: 'NY',
  businessZipCode: '12345',
  businessPhone: '2017700500',
  website: '',
  websiteNotAvailable: true,
  industryCategory: 'Accommodation and Food Services',
  industryType: 'Caterers',
  yearOfFormation: 2020,
  businessIdentification: 'ein',
  controllerIsOwner: 'yes',
  owners: [
    {
      firstName: 'Mary',
      middleName: 'James',
      lastName: 'Sue',
      jobTitle: 'COO',
      email: 'maryjamessue@fake.website',
      addressLine1: '2468 Real Ave',
      city: 'New Fake City',
      state: 'NY',
      zipCode: '24680',
      phone: '2017700500',
      birthDate: '1933-03-03T05:00:00.000Z',
      ssn9: '394943213',
    },
  ],
  decisionMakers: [
    {
      id: '50d20c37-4f12-44ca-a88e-203adf09ee15',
      firstName: 'Apurva',
      middleName: '',
      lastName: 'Rahul',
      jobTitle: 'Other',
      jobTitleDescription: 'Super Chef',
      email: 'apurva@harryfoods.com',
      addressLine1: '9 Apple Street',
      addressLine2: '',
      addressLine3: '',
      city: 'Fruitlane',
      state: 'DE',
      zipCode: '87654',
      phone: '2017700500',
      birthDate: '1989-05-17T00:00:00.000Z',
    },
  ],
  decisionMakersExist: 'yes',
  businessAddressSameAsController: false,
  decisionMakersValid: true,
  verificationResponses: [
    {
      id: 'A01021',
      response: 'FALSE',
      answered: true,
    },
    {
      id: 'A00033',
      response: 'FALSE',
      answered: true,
    },
    {
      id: 'A01147',
      response: 'ACTUAL',
      answered: true,
    },
    {
      id: 'A01334',
      response: ['USD'],
      answered: true,
    },
    {
      id: 'A00092',
      response: '1',
      answered: true,
    },
  ],
  verificationsLoaded: true,
  reviewedDisclosure: false,
  reviewedTerms: false,
  attestedReadDocuments: false,
  attestedAuthorized: false,
  attestedDataCorrect: false,
};

const personalDetialsMock = {};
export {
  verificationsMock,
  formCompleteMock,
  businessDetailsMock,
  personalDetialsMock,
  controllerMock,
};
