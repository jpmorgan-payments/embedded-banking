export const organizationFields = [
  { label: 'Organization Name', path: 'organizationDetails.organizationName' },
  { label: 'Business Name', path: 'organizationDetails.dbaName' },
  { label: 'External ID', path: 'externalId' },
  { label: 'Email', path: 'email' },
  { label: 'Profile Status', path: 'profileStatus' },
  { label: 'Status', path: 'status' },
  { label: 'Created At', path: 'createdAt' },
  { label: 'Roles', path: 'roles' },
  { label: 'Organization Type', path: 'organizationDetails.organizationType' },
  { label: 'Industry Category', path: 'organizationDetails.industryCategory' },
  { label: 'Industry Type', path: 'organizationDetails.industryType' },
  {
    label: 'Country of Formation',
    path: 'organizationDetails.countryOfFormation',
  },
  { label: 'Year of Formation', path: 'organizationDetails.yearOfFormation' },
];

export const individualFields = [
  { label: 'External ID', path: 'externalId' },
  { label: 'Email', path: 'email' },
  { label: 'Profile Status', path: 'profileStatus' },
  { label: 'Status', path: 'status' },
  { label: 'Created At', path: 'createdAt' },
  { label: 'Roles', path: 'roles' },
  { label: 'First Name', path: 'individualDetails.firstName' },
  { label: 'Last Name', path: 'individualDetails.lastName' },
  {
    label: 'Country of Residence',
    path: 'individualDetails.countryOfResidence',
  },
  { label: 'Nature of Ownership', path: 'individualDetails.natureOfOwnership' },
  { label: 'Job Title', path: 'individualDetails.jobTitle' },
  {
    label: 'Job Title Description',
    path: 'individualDetails.jobTitleDescription',
  },
  { label: 'Sole Owner', path: 'individualDetails.soleOwner' },
];
