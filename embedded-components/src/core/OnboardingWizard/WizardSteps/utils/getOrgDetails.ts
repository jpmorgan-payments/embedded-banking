const getOrgDetails = (orgDetailsData: any): any => {
  const orgDetails = orgDetailsData?.organizationDetails.orgDetails;
  return {
    ...orgDetails,
    email: orgDetailsData.organizationDetails.email,
  };
};

const getOrg = (orgDetailsData: any): any => {
  const orgDetails = orgDetailsData?.organizationDetails;
  return {
    ...orgDetails,
    email: orgDetailsData.organizationDetails.email,
  };
};
export { getOrgDetails, getOrg };
