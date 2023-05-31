import { Button, Text } from '@mantine/core';
import { Panel, TableWithJsonDisplay } from 'components';
import { useDebitCards } from './hooks';

export const DebitCardsTable = () => {
  const { data: { items: cards = [], metadata } = {}, isLoading } =
    useDebitCards();

  const ths = (
    <tr>
      <th>Cardholder Name</th>
      <th>Card Number</th>
      <th>Status</th>
    </tr>
  );

  const rows = cards.map((card, index) => (
    <tr key={index}>
      <td>
        {card.firstName} {card.lastName}
      </td>
      <td>**** {card.last4}</td>
      <td>{card.status}</td>
    </tr>
  ));
  return (
    <Panel
      title="List of Debit Cards"
      apiCallType="GET"
      apiEndpoint="/debit-cards"
    >
      <Text>
        Here's an example of what can be done when calling a list of Debit Cards
      </Text>
      <TableWithJsonDisplay
        apiEndpoint="/debit-cards"
        ths={ths}
        rows={rows}
        json={cards}
        isLoading={isLoading}
      />
    </Panel>
  );
};
