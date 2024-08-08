import {
  AccountType,
  CountryCode,
  ListRecipientsResponse,
  PartyType,
  RecipientContactContactType,
  RecipientStatus,
  RecipientType,
} from '@/api/generated/embedded-banking.schemas';

export const linkedAccountListMock: ListRecipientsResponse = {
  page: 0,
  limit: 10,
  total_items: 1,
  recipients: [
    {
      partyDetails: {
        address: {
          addressLine1: '451 Rose Garden',
          addressLine2: '11249312',
          addressLine3: 'Rose House',
          city: 'New York City',
          countryCode: CountryCode.US,
          state: 'NY',
          postalCode: '10007',
        },
        type: PartyType.INDIVIDUAL,
        firstName: 'Alex',
        lastName: 'James',
        contacts: [
          {
            contactType: RecipientContactContactType.EMAIL,
            value: 'testemail1@test.com',
          },
          {
            contactType: RecipientContactContactType.PHONE,
            countryCode: '+1',
            value: '7587819587',
          },
        ],
      },
      account: {
        number: '2134380369277971423204567',
        type: AccountType.CHECKING,
        countryCode: CountryCode.US,
        routingInformation: [
          {
            routingCodeType: 'USABA',
            routingNumber: '154135115',
            transactionType: 'ACH',
          },
        ],
      },
      id: 'c0712fc9-b7d5-4ee2-81bb-21ba80d56b4b',
      type: RecipientType.LINKED_ACCOUNT,
      status: RecipientStatus.ACTIVE,
    },
  ],
};

export const linkedAccountMicrodepositListMock: ListRecipientsResponse = {
  page: 0,
  limit: 10,
  total_items: 1,
  recipients: [
    {
      partyDetails: {
        address: {
          addressLine1: '451 Rose Garden',
          addressLine2: '11249312',
          addressLine3: 'Rose House',
          city: 'New York City',
          countryCode: CountryCode.US,
          state: 'NY',
          postalCode: '10007',
        },
        type: PartyType.INDIVIDUAL,
        firstName: 'Alex',
        lastName: 'James',
        contacts: [
          {
            contactType: RecipientContactContactType.EMAIL,
            value: 'testemail1@test.com',
          },
          {
            contactType: RecipientContactContactType.PHONE,
            countryCode: '+1',
            value: '7587819587',
          },
        ],
      },
      account: {
        number: '2134380369277971423204567',
        type: AccountType.CHECKING,
        countryCode: CountryCode.US,
        routingInformation: [
          {
            routingCodeType: 'USABA',
            routingNumber: '154135115',
            transactionType: 'ACH',
          },
        ],
      },
      id: 'c0712fc9-b7d5-4ee2-81bb-21ba80d56b4b',
      type: RecipientType.LINKED_ACCOUNT,
      status: RecipientStatus.MICRODEPOSITS_INITIATED,
    },
  ],
};

export const linkedAccountReadyForValidationMock: ListRecipientsResponse = {
  page: 0,
  limit: 10,
  total_items: 1,
  recipients: [
    {
      partyDetails: {
        address: {
          addressLine1: '451 Rose Garden',
          addressLine2: '11249312',
          addressLine3: 'Rose House',
          city: 'New York City',
          countryCode: CountryCode.US,
          state: 'NY',
          postalCode: '10007',
        },
        type: PartyType.INDIVIDUAL,
        firstName: 'Alex',
        lastName: 'James',
        contacts: [
          {
            contactType: RecipientContactContactType.EMAIL,

            value: 'testemail1@test.com',
          },
          {
            contactType: RecipientContactContactType.PHONE,
            countryCode: '+1',
            value: '7587819587',
          },
        ],
      },
      account: {
        number: '2134380369277971423204567',
        type: AccountType.CHECKING,
        countryCode: CountryCode.US,
        routingInformation: [
          {
            routingCodeType: 'USABA',
            routingNumber: '154135115',
            transactionType: 'ACH',
          },
        ],
      },
      id: 'c0712fc9-b7d5-4ee2-81bb-21ba80d56b4b',
      type: RecipientType.LINKED_ACCOUNT,
      status: RecipientStatus.READY_FOR_VALIDATION,
    },
  ],
};

export const linkedAccountRejectedMock: ListRecipientsResponse = {
  page: 0,
  limit: 10,
  total_items: 1,
  recipients: [
    {
      partyDetails: {
        address: {
          addressLine1: '451 Rose Garden',
          addressLine2: '11249312',
          addressLine3: 'Rose House',
          city: 'New York City',
          countryCode: CountryCode.US,
          state: 'NY',
          postalCode: '10007',
        },
        type: PartyType.INDIVIDUAL,
        firstName: 'Alex',
        lastName: 'James',
        contacts: [
          {
            contactType: RecipientContactContactType.EMAIL,

            value: 'testemail1@test.com',
          },
          {
            contactType: RecipientContactContactType.PHONE,
            countryCode: '+1',
            value: '7587819587',
          },
        ],
      },
      account: {
        number: '2134380369277971423204567',
        type: AccountType.CHECKING,
        countryCode: CountryCode.US,
        routingInformation: [
          {
            routingCodeType: 'USABA',
            routingNumber: '154135115',
            transactionType: 'ACH',
          },
        ],
      },
      id: 'c0712fc9-b7d5-4ee2-81bb-21ba80d56b4b',
      type: RecipientType.LINKED_ACCOUNT,
      status: RecipientStatus.REJECTED,
    },
  ],
};
