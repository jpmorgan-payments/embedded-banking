import type { OnboardingValues } from './models';

export const mockFormValuesLLC = {
  // Business Details
  businessName: 'A Fake Company, LLC',
  ein: '12-3456789',
  yearOfFormation: 2020,
  website: '',
  websiteNotAvailable: true,
  businessDescription: 'We do stuff.',
  businessAddress: '123 Business Street',
  businessCity: 'Companytown',
  businessState: 'NY',
  businessPhone: '1234567890',
  businessZipCode: '12345',
  // Controller Details
  controllerFirstName: 'John',
  controllerLastName: 'Doe',
  controllerEmail: 'johndoe@fake.website',
  controllerJobTitle: 'President',
  controllerAddress: '456 Controller Road',
  controllerCity: 'Fakecity',
  controllerState: 'NJ',
  controllerZipCode: '10101',
  controllerPhone: '9876543210',
  controllerBirthDate: new Date('07-23-1984'),
  controllerSsn4: '1234',
  // Owners
  ownersExist: 'yes',
  controllerIsOwner: 'yes',
  owners: [
    {
      firstName: 'Mary',
      middleName: 'James',
      lastName: 'Sue',
      email: 'maryjamessue@fake.website',
      address: '2468 Real Ave',
      city: 'New Fake City',
      state: 'NY',
      zipCode: '24680',
      phone: '1234123412',
      birthDate: new Date('03-03-1933'),
      ssn4: '4321',
    },
  ],
} as OnboardingValues;

export const mockFormValuesSP = {
  businessName: '',
  ein: '',
  yearOfFormation: 2020,
  website: 'https://www.mybusiness.fakewebsite',
  websiteNotAvailable: false,
  businessDescription: 'We do stuff.',
  businessAddress: '123 Home Street',
  businessCity: 'Hometown',
  businessState: 'NJ',
  businessPhone: '1234567890',
  businessZipCode: '12345',
  // Controller Details
  controllerFirstName: 'John',
  controllerLastName: 'Doe',
  controllerEmail: 'johndoe@fake.website',
  controllerAddressSameAsBusiness: true,
  controllerPhone: '9876543210',
  controllerBirthDate: new Date('07-23-1984'),
  controllerSsn9: '123456789',
} as OnboardingValues;
