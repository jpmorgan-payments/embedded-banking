import _ from "lodash";
import { DecisionMakerFormValues } from "../DecisionMakersForm/DecisionMakerForm.schema";
import { BusinessDetailsStepValues } from "../BusinessDetails/BusinessDetails.schema";


export const addPartyAction = (form: any, owner: DecisionMakerFormValues, roles: string[]) => {
    const deepCopy = _.cloneDeep(form);
    const parties = deepCopy?.form?.parties;
    parties.push({
      partyType: 'INDIVIDUAL',
      email: owner?.email,
      roles,
      individualDetails: {
        firstName: owner?.firstName,
        lastName: owner?.lastName,
        jobTitle: owner?.jobTitle,
        jobTitleDescription: owner?.jobTitleDescription,
        soleOwner: form?.legalStructure === 'SOLE_PROPRIETORSHIP',
        countryOfResidence: 'US',
        addresses: [
          {
            addressType: 'RESIDENTIAL_ADDRESS',
            addressLines: _.union(
              owner?.addressLine1,
              owner?.addressLine2,
              owner?.addressLine3
            ),
            city: owner?.city,
            state: owner?.state,
            postalCode: owner?.zip,
            country: 'US',
          },
        ],
      },
    });
    deepCopy.form.parties = parties;
    return deepCopy;
}

export const addBusinessAction = (business: BusinessDetailsStepValues, form: any) => {
    const deepCopy = _.cloneDeep(form);
    const parties = deepCopy?.form?.parties;
    parties.push({
      partyType: 'ORGANIZATION',
      email: business?.businessEmail,
      roles: ['CLIENT'],
      organizationDetails: {
        organizationType: form?.legalStructure,
        organizationName: business?.businessName,
        organizationDescription: business?.businessDescription,
        industryCategory: business?.industryCategory,
        industryType: business?.industryType,
        yearOfFormation: business?.yearOfFormation,
        countryOfFormation: 'US',
        significantOwnership: business?.significantOwnership,
        addresses: [
          {
            addressType: 'BUSINESS_ADDRESS',
            addressLines: _.union(
              business?.addressLine1,
              business?.addressLine2,
              business?.addressLine3
            ),
            city: business?.city,
            state: business?.state,
            postalCode: business?.zip,
            country: 'US',
          },
        ],
        phone: {
          phoneType: 'BUSINESS_PHONE',
          countryCode: '+1',
          phoneNumber: business.businessPhone,
        },
        organizationIds: business?.ein
          ? [
              {
                idType: 'EIN',
                issuer: 'US',
                value: business?.ein,
              },
            ]
          : [],
        websiteAvailable: !business?.websiteNotAvailable,
        website: business?.website,
      },
    });
    deepCopy.form.parties = parties;
    return deepCopy;
}