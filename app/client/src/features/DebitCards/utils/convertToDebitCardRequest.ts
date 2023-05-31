import type { InferType } from 'yup';
import type { CreateDebitCardRequest } from 'generated-api-models';
import type { validationSchema } from './validationSchema';

export function convertToDebitCardRequest(
  values: InferType<typeof validationSchema>,
) {
  const { account, party } = values;
  return {
    accountId: account,
    firstName: 'John',
    middleName: 'Xavier',
    lastName: 'Doe',
    birthDate: '2000-10-12T00:00:00.000Z',
    citizenshipCountry: 'US',
    email: 'john.doe@xyz.com',
    mobilePhone: {
      contactNumber: '5558883333',
      countryCode: '840',
    },
    mailingAddress: {
      address1: '345 Wouda St',
      address2: 'Malibu Point',
      address3: '',
      city: 'Springfield',
      state: 'ND',
      country: 'United States',
      postalCode: '58008',
    },
    governmentId: {
      idType: 'T',
      idIssuanceCountry: 'US',
      idValue: '515081972',
      idIssuanceDate: '2015-10-15T00:00:00.000Z',
      idExpirationDate: '2023-03-14T00:00:00.000Z',
    },
  } as CreateDebitCardRequest;
}
