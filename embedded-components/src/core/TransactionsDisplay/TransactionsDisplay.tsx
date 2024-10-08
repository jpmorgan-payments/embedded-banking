import { FC } from 'react';

import { useListTransactionsV2 } from '@/api/generated/ef-v2';
import { DataTable } from '@/components/ui/data-table';

import { columns } from './TransactionsDisplay.columns';
import { modifyTransactionsData } from './utils/modifyTransactionsData';

export type TransactionsDisplayProps = {
  accountId: string;
};

export const TransactionsDisplay: FC<TransactionsDisplayProps> = ({
  accountId,
}) => {
  const { data, status, failureReason } = useListTransactionsV2({});

  return (
    <div className="eb-component">
      {status === 'pending' && <p>Loading...</p>}
      {status === 'error' && (
        <p>Error: {failureReason?.message ?? 'Unknown error'}</p>
      )}
      {status === 'success' && data.items && (
        <DataTable
          columns={columns}
          data={modifyTransactionsData(data.items, accountId)}
        />
      )}
    </div>
  );
};
