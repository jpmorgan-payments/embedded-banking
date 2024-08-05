const getIndividualDetailsByRole = (indDetailsData: any, role: any): any[] => {
  return (
    indDetailsData?.individualDetails &&
    Object.keys(indDetailsData.individualDetails).map((key: any) => {
      if (indDetailsData.individualDetails[key].roles.includes(role)) {
        return indDetailsData.individualDetails[key].indDetails;
      }

      return null;
    })
  );
};
const getIndividualByRole = (indDetailsData: any, role: any): any[] => {
  return (
    indDetailsData?.individualDetails &&
    Object.keys(indDetailsData.individualDetails).map((key: any) => {
      if (indDetailsData.individualDetails[key].roles.includes(role)) {
        return indDetailsData.individualDetails[key];
      }

      return null;
    })
  );
};

export { getIndividualDetailsByRole, getIndividualByRole };
