import { Text } from '@mantine/core';
import { Panel, TableWithJsonDisplay } from 'components';
import { useAccounts } from './hooks';

export const AccountsTable = () => {
  const { data: { items: accounts = [], metadata } = {}, isLoading } =
    useAccounts();

  const ths = (
    <tr>
      <th>Label</th>
      <th>Account Number</th>
      <th>State</th>
    </tr>
  );

  const rows = accounts.map((item, index) => (
    <tr key={index}>
      <td>{item.label}</td>
      <td>{item.paymentRoutingInformation?.accountNumber}</td>
      <td>{item.state}</td>
    </tr>
  ));

  return (
    <Panel title="List of Accounts" apiCallType="GET" apiEndpoint="/accounts">
      <Text>
        You can use this call to return a list of all accounts for a user.
      </Text>
      <Text>
        The response does not contain any balance information for any of the
        returned accounts.
      </Text>
      <TableWithJsonDisplay
        ths={ths}
        rows={rows}
        apiEndpoint="/accounts"
        json={accounts}
        isLoading={isLoading}
      />
    </Panel>
  );
};
