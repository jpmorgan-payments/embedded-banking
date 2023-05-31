import { Badge } from '@mantine/core';

import { Panel, TableWithJsonDisplay } from 'components';
import { useTransactions } from './hooks';

const badgeStatusMap = new Map([
  ['COMPLETED', 'green'],
  ['PENDING', 'grey'],
  ['REJECTED', 'red'],
]);

export const TransactionsTable = () => {
  const { data: { items: transactions = [], metadata } = {}, isLoading } =
    useTransactions();

  const ths = (
    <tr>
      <th>Status</th>
      <th>Date</th>
      <th>Client Reference</th>
      <th>Amount</th>
      <th>Currency</th>
      <th>Type</th>
    </tr>
  );

  const rows = transactions
    .sort(
      (a, b) =>
        Number(new Date(b.createdDate + '')) -
        Number(new Date(a.createdDate + '')),
    )
    .map((txn, index) => (
      <tr key={index}>
        <td>
          <Badge color={badgeStatusMap.get(txn.status ?? 'PENDING')}>
            {txn.status}
          </Badge>
        </td>
        <td>{new Date(txn.createdDate + '').toLocaleDateString()}</td>
        <td>{txn.creditorAccount}</td>
        <td>{txn.amount}</td>
        <td>{txn.currency}</td>
        <td>{txn.transactionType}</td>
      </tr>
    ));

  return (
    <Panel
      title="Transactions List"
      apiCallType="GET"
      apiEndpoint="/transactions"
    >
      <TableWithJsonDisplay
        apiEndpoint="/transactions"
        ths={ths}
        rows={rows}
        json={transactions}
        isLoading={isLoading}
      />
    </Panel>
  );
};
