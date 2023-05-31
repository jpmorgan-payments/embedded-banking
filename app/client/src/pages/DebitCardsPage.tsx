import { Text } from '@mantine/core';

import { PageWrapper } from 'components';
import { GITHUB_REPO } from 'data/constants';
import { DebitCardsTable, CreateDebitCardForm } from 'features/DebitCards';

export const DebitCardsPage = () => {
  return (
    <PageWrapper
      title="Managing Debit Cards"
      apiEndpoint="/debit-cards"
      githubLink={`${GITHUB_REPO}/tree/main/app/client/src/features/DebitCards`}
    >
      <div>
        <Text>
          Clients can have multiple debit cards connected to their Embedded
          Banking accounts.
        </Text>
        <Text>
          You can request a debit card, and after it's been created, you can
          change the PIN, lock/unlock it, or replace it.
        </Text>
      </div>
      <CreateDebitCardForm />
      <DebitCardsTable />
    </PageWrapper>
  );
};
