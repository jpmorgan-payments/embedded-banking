import type { CreateClientRequest } from 'generated-api-models';
import type { EntityType, OnboardingValues } from '../models';

export function convertFormValuesToClientRequest(
  values: OnboardingValues,
  entityType: EntityType,
) {
  return {
    address: {
      addressLine1: values.businessAddress,
      addressType: '',
      addressLine2: undefined,
      addressLine3: undefined,
      city: values.businessCity,
      state: values.businessState,
      postalCode: values.businessZipCode,
      countryCode: 'US',
    },
    email: '',
    phone: {
      countryCode: '+1',
      phoneNumber: values.businessPhone,
    },
    businessType:
      entityType === 'LLC' ? 'Privately Owned Business' : 'Sole Proprietorship',
    legalStructure: entityType,
    industryCategory: values.industryCategory,
    industryType: values.industryType,
    significantOwnership: undefined,
    entititiesInOwnership: undefined,
    businessName: values.businessName,
    businessAliasName: undefined,
    businessDescription: values.businessDescription,
    websiteAvailable: !values.websiteNotAvailable,
    website: values.website,
    countryOfFormation: 'US',
    yearOfFormation: String(values.yearOfFormation),
    identities: [
      {
        idType: 'EIN',
        idDescription: 'Employee Identification Number',
        idIssuer: 'US',
        idValue: values.ein,
      },
    ],
    parentClientId: '',
    products: ['EB'],
    relatedParties: [
      {
        action: "ADD",
        address: {
          addressType: '',
          addressLine1: values.controllerAddressSameAsBusiness
            ? values.businessAddress
            : values.controllerAddress,
          city: values.controllerAddressSameAsBusiness
            ? values.businessCity
            : values.controllerCity,
          state: values.controllerAddressSameAsBusiness
            ? values.businessState
            : values.controllerState,
          postalCode: values.controllerAddressSameAsBusiness
            ? values.businessZipCode
            : values.controllerZipCode,
          countryCode: 'US',
        },
        email: values.controllerEmail,
        phone: {
          countryCode: '+1',
          phoneNumber: values.controllerPhone,
        },
        identities: [
          {
            idType: 'EIN',
            idDescription: 'Employee Identification Number',
            idIssuer: 'US',
            idValue: values.ein,
          },
        ],
        prefix: '',
        firstName: values.controllerFirstName,
        middleName: values.controllerMiddleName,
        lastName: values.controllerLastName,
        suffix: '',
        jobTitle: '',
        birthDate: values.controllerBirthDate.toLocaleDateString(),
        natureOfOwnership: 'Direct',
        percentageOfOwnership: undefined,
        partyType: 'Individual',
        partyRole: values.controllerIsOwner ? ['CONTROLLER', 'OWNER'] : ['CONTROLLER'],
      },
    ].concat(
      values.ownersExist === 'yes'
        ? values.owners?.map((owner) => ({
            action: "ADD",
            address: {
              addressType: '',
              addressLine1: owner.address,
              city: owner.city,
              state: owner.state,
              postalCode: owner.zipCode,
              countryCode: 'US',
            },
            email: owner.email,
            phone: {
              countryCode: '+1',
              phoneNumber: owner.phone,
            },
            identities: [
              {
                idType: 'EIN',
                idDescription: 'Employee Identification Number',
                idIssuer: 'US',
                idValue: values.ein,
              },
            ],
            prefix: '',
            firstName: owner.firstName,
            middleName: owner.middleName,
            lastName: owner.lastName,
            suffix: '',
            jobTitle: '',
            birthDate: owner.birthDate.toLocaleDateString(),
            natureOfOwnership: 'Direct',
            percentageOfOwnership: undefined,
            partyType: 'Individual',
            partyRole: ['OWNER'],
          }))
        : [],
    ),
  } as CreateClientRequest;
}
