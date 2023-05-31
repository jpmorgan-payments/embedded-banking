import { Text } from '@mantine/core';
import { PageWrapper } from 'components';
import { GITHUB_REPO } from 'data/constants';
import {
  AccountBalanceDisplay,
  AccountsTable,
} from 'features/Accounts';

export const AccountsPage = () => {
  return (
    <PageWrapper
      title="Managing Accounts"
      apiEndpoint="/accounts"
      githubLink={`${GITHUB_REPO}/tree/main/app/client/src/features/Accounts`}
    >
      <div>
        <Text>
          Within a single Embedded Banking profile, you can create multiple
          accounts.
        </Text>
        <Text>
          Your clients can use each account to send and receive money, and add debit cards.
        </Text>
      </div>
      {/* <CreateAccountForm /> */}
      <AccountsTable />
      <AccountBalanceDisplay />
    </PageWrapper>
  );
};
