import { Recipient } from '@/api/generated/embedded-banking.schemas';

export const getRecipientLabel = (recipient: Recipient) => {
  const name =
    recipient.partyDetails.type === 'INDIVIDUAL'
      ? [
          recipient.partyDetails.firstName,
          recipient.partyDetails.lastName,
        ].join(' ')
      : recipient.partyDetails.businessName;

  return `${name} (...${recipient.account.number.slice(-4)})`;
};
