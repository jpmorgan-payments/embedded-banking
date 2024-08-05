import {
  AddressDtoSmbdo,
  ClientResponse,
  IndividualDetails,
  IndividualIdentityDTO,
  OrganizationDetails,
  OrganizationIdentityDto,
  PartyResponse,
} from '@/api/generated/embedded-banking.schemas';

import { transformDateofBirth } from '../WizardSteps/utils/transformDateofBirth';

const fromApiToForm = (client: ClientResponse) => {
  if (!client?.parties) {
    throw new Error('API Response failed,  no parties detected');
  }
  const flattened: any = {
    id: client.id,
    attestations: client.attestations,
    partyId: client.partyId,
    products: client.products,
    outstanding: client.outstanding,
    questionResponses: client.questionResponses,
    status: client.status,
    organizationDetails: {},
    individualDetails: {},
  };

  client?.parties?.forEach((party: PartyResponse) => {
    if (party.organizationDetails) {
      const org = flattened.organizationDetails;

      org.id = party.id;
      org.partyType = party.partyType;
      org.externalId = party.externalId;
      org.email = party.email;
      org.roles = party.roles;
      org.profileStatus = party.profileStatus;
      org.status = party.status;
      org.createdAt = party.createdAt;

      org.orgDetails = {};
      const { orgDetails } = org;
      const orgD: OrganizationDetails = party.organizationDetails;

      orgDetails.organizationType = orgD.organizationType;
      orgDetails.organizationName = orgD.organizationName;
      orgDetails.dbaName = orgD.dbaName;
      orgDetails.organizationDescription = orgD.organizationDescription;
      orgDetails.industryCategory = orgD.industryCategory;
      orgDetails.industryType = orgD.industryType;
      orgDetails.countryOfFormation = orgD.countryOfFormation;
      orgDetails.yearOfFormation = orgD.yearOfFormation;
      orgDetails.significantOwnership = orgD.significantOwnership;
      orgDetails.entitiesInOwnership = orgD.entitiesInOwnership;
      orgDetails.phoneType = orgD?.phone?.phoneType || '';
      orgDetails.countryCode = orgD?.phone?.countryCode || '';
      orgDetails.businessPhone = orgD?.phone?.phoneNumber || '';
      orgDetails.websiteNotAvailable = orgD.websiteAvailable;
      orgDetails.website = orgD?.website;
      orgDetails.businessEmail = party.email;

      orgD?.addresses?.forEach((address: AddressDtoSmbdo) => {
        orgDetails.addressType = address.addressType;
        address.addressLines.forEach((addLine, idx) => {
          orgDetails[`businessAddressLine${idx + 1}`] = addLine;
        });
        orgDetails.businessCity = address.city;
        orgDetails.businessState = address.state;
        orgDetails.businessPostalCode = address.postalCode;
        orgDetails.country = address.country;
      });

      orgD?.organizationIds?.forEach((orgId: OrganizationIdentityDto) => {
        const { idType, value } = orgId;
        orgDetails[`${idType.toLocaleLowerCase()}`] = value;
      });
    }

    if (party.individualDetails) {
      const ind = flattened.individualDetails;
      ind[`${party.id}`] = {};
      const actInd = ind[`${party.id}`];

      actInd.id = party.id;
      actInd.partyType = party.partyType;
      actInd.externalId = party.externalId;
      actInd.email = party.email;
      actInd.roles = party.roles;
      actInd.profileStatus = party.profileStatus;
      actInd.status = party.status;
      actInd.createdAt = party.createdAt;
      actInd.parentPartyId = party?.parentPartyId;
      actInd.parentExternalId = party?.parentExternalId;

      actInd.indDetails = {};
      const { indDetails } = actInd;
      const indD: IndividualDetails = party.individualDetails;

      indDetails.email = party.email;
      indDetails.firstName = indD.firstName;
      indDetails.lastName = indD.lastName;
      indDetails.countryOfResidence = indD.countryOfResidence;
      indDetails.natureOfOwnership = indD.natureOfOwnership;
      indDetails.birthDate = transformDateofBirth(indD.birthDate);
      indDetails.jobTitle = indD.jobTitle;
      indDetails.jobTitleDescription = indD.jobTitleDescription;
      indDetails.soleOwner = indD.soleOwner;
      indDetails.countryCode = indD?.phone?.countryCode || '';
      indDetails.phone = indD?.phone?.phoneNumber || '';

      indD?.addresses?.forEach((address: AddressDtoSmbdo) => {
        indDetails.addressType = address.addressType;
        address.addressLines.forEach((addLine, idx) => {
          indDetails[`addressLine${idx + 1}`] = addLine;
        });
        indDetails.city = address.city;
        indDetails.state = address.state;
        indDetails.postalCode = address.postalCode;
        indDetails.country = address.country;
      });

      indD?.individualIds?.forEach((indId: IndividualIdentityDTO) => {
        const { idType, value } = indId;
        indDetails[`${idType.toLocaleLowerCase()}`] = value.trim();
      });
    }
  });

  return flattened;
};

export { fromApiToForm };
