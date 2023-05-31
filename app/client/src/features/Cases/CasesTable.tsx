import { Text } from '@mantine/core';
import { Panel, TableWithJsonDisplay } from 'components';
import { useCases } from './hooks';

export const CasesTable = () => {
  const { data: { items: cases = [] } = {}, isLoading } = useCases();

  const ths = (
    <tr>
      <th>Date Updated</th>
      <th>Case Id</th>
      <th>Type</th>
      <th>Status</th>
      <th>Subject</th>
      <th>Date Created</th>
      <th>Created By</th>
    </tr>
  );

  const rows = cases
    .sort(
      (a, b) =>
        Number(new Date(b.updatedDate)) - Number(new Date(a.updatedDate)),
    )
    .map((item, index) => (
      <tr key={index}>
        <td>{new Date(item.updatedDate).toLocaleDateString()}</td>
        <td>{item.id}</td>
        <td>{item.type}</td>
        <td>{item.status}</td>
        <td>{item.subject}</td>
        <td>{new Date(item.createdDate).toLocaleDateString()}</td>
        <td>{item.createdBy?.name}</td>
      </tr>
    ));

  return (
    <Panel apiCallType="GET" apiEndpoint="/cases" title="List of Support Cases">
      <Text>
        Here's an example of what can be done when calling a list of Support
        Cases
      </Text>
      <TableWithJsonDisplay
        apiEndpoint="/cases"
        ths={ths}
        rows={rows}
        json={cases}
        isLoading={isLoading}
      />
    </Panel>
  );
};
