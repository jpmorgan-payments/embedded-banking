import { Recipient } from '@/api/generated/ef-v1.schemas';

export const getRecipientLabel = (recipient: Recipient) => {
  const name =
    recipient.partyDetails?.type === 'INDIVIDUAL'
      ? [
          recipient.partyDetails?.firstName,
          recipient.partyDetails?.lastName,
        ].join(' ')
      : recipient.partyDetails?.businessName;

  return `${name} (...${recipient.account ? recipient.account.number?.slice(-4) : ''})`;
};
