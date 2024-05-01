type ADDRESS = {
  addressType: string;
  addressLines: string[];
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type ID = {
  idType: string;
  issuer: string;
  value: string;
};

export type OrganizationDetails = {
  organizationType: string;
  organizationName: string;
  dbaName?: string;
  organizationDescription: string;
  industryCategory?: string;
  industryType?: string;
  countryOfFormation: string;
  yearOfFormation?: string;
  significantOwnership?: boolean;
  entitiesInOwnership?: boolean;
  addresses?: ADDRESS[];
  phone?: {
    phoneType: string;
    countryCode: string;
    phoneNumber: string;
  };
  organizationIds?: ID[];
  websiteAvailable?: boolean;
  website: string;
};

export type IndividualDetails = {
  firstName: string;
  lastName: string;
  countryOfResidence: string;
  natureOfOwnership?: string;
  jobTitle?: string;
  jobTitleDescription?: string;
  soleOwner?: boolean;
  addresses?: ADDRESS[];
  individualIds?: ID[]
};

export type Party = {
  partyType?: 'ORGANIZATION' | 'INDIVIDUAL';
  email?: string;
  roles: string[];
  organizationDetails?: OrganizationDetails;
  individualDetails?: IndividualDetails;
};
