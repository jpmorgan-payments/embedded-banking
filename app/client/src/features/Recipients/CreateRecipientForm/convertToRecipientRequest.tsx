import type {
  CountryCode,
  RoutingCodeType,
  RecipientContact,
  RecipientRequest,
  RecipientType,
} from '../../../generated-api-models';
import type { CreateRecipientFormValues } from './validationSchema';

export const convertToRecipientRequest = (
  formValues: CreateRecipientFormValues,
): RecipientRequest => {
  const contacts: RecipientContact[] = [];

  if (formValues?.phone) {
    contacts.push({
      contactType: 'PHONE' as RecipientContact['contactType'],
      countryCode: '+1',
      value: formValues?.phone,
    });
  }
  if (formValues?.email) {
    contacts.push({
      contactType: 'EMAIL' as RecipientContact['contactType'],
      value: formValues?.email,
    });
  }

  return {
    partyDetails: {
      type: formValues?.type.toUpperCase() as RecipientType,
      ...(formValues?.type.toUpperCase() === 'ORGANIZATION' && {
        businessName: formValues?.businessName,
      }),
      ...(formValues?.type.toUpperCase() === 'INDIVIDUAL' && {
        firstName: formValues?.firstName,
        lastName: formValues?.lastName,
      }),
      contacts,
      ...(formValues?.address1 && {
        address: {
          addressLine1: formValues?.address1,
          ...(formValues?.address2 && {
            addressLine2: formValues?.address2,
          }),
          ...(formValues?.address3 && {
            addressLine3: formValues?.address3,
          }),
          city: formValues?.city,
          countryCode: 'US' as CountryCode,
          state: formValues?.state,
          zip: formValues?.zip,
        },
      }),
    },
    account: {
      number: formValues?.accountNumber,
      type: formValues?.accountType,
      routingCodeType: formValues?.creditorRoutingCodeType as RoutingCodeType,
      routingNumber: formValues?.creditorRoutingNumber,
      countryCode: formValues?.creditorCountryCode as CountryCode,
    },
  };
};
