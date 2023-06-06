import { Badge, Space } from '@mantine/core';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import { GITHUB_REPO } from 'data/constants';
import {
  CreateTransactionForm,
  TransactionsTable,
} from 'features/Transactions';

export const TransactionsPage = () => {
  return (
    <PageWrapper
      title="Moving Money"
      apiEndpoint="/transactions"
      githubLink={`${GITHUB_REPO}/tree/main/app/client/src/features/Transactions`}
    >
      <div>
        To make a payment in Embedded Banking, you send a <Badge>POST /transactions</Badge> request. The payload in this request must contain the data of the
        recipient being paid, along with details of the account the funds are being drawn from. You can fetch
        this data with <Badge>GET /recipients</Badge> and{' '}
        <Badge>GET /accounts</Badge> respectively.
        <Space h="xs" />
        The <Badge>GET /transactions</Badge> call retrieves a list of
        transactions.
      </div>
      <CreateTransactionForm />
      <TransactionsTable />
    </PageWrapper>
  );
};
