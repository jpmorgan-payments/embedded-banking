import { Text } from '@mantine/core';
import { Panel, TableWithJsonDisplay } from 'components';
import { useRecipients } from './hooks';

export const RecipientsTable = () => {
  const { data: { recipients } = {}, isLoading } = useRecipients();

  const ths = (
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Business Name</th>
      <th>Type</th>
      <th>Account Number</th>
      <th>Routing Number</th>
    </tr>
  );

  const rows = recipients?.map((item, index) => (
    <tr key={index}>
      <td>{item.partyDetails.firstName}</td>
      <td>{item.partyDetails.lastName}</td>
      <td>{item.partyDetails.businessName}</td>
      <td>{item.partyDetails.type}</td>
      <td>{item.account.number}</td>
      <td>{item.account.routingNumber}</td>
    </tr>
  ));

  return (
    <Panel
      title="List of Recipients"
      apiCallType="GET"
      apiEndpoint="/recipients"
    >
      <Text>
        This endpoint retrieves a list of all recipients for a given client.
      </Text>
      <TableWithJsonDisplay
        ths={ths}
        rows={rows}
        json={recipients}
        apiEndpoint="/recipients"
        isLoading={isLoading}
      />
    </Panel>
  );
};
