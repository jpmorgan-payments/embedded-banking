import { ColumnDef } from '@tanstack/react-table';

import { formatNumberToUSD } from './utils/formatNumberToUSD';
import { TransformedTransaction } from './utils/transformTransactionsData';

export const columns: ColumnDef<TransformedTransaction>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    id: 'amount',
    accessorFn: (row) => {
      if (row.amount === undefined) {
        return 'N/A';
      }
      const formattedAmount = formatNumberToUSD(row.amount);
      return row.payinOrPayout === 'PAYIN'
        ? formattedAmount
        : `-${formattedAmount}`;
    },
    header: 'Amount',
    meta: {
      cellClassName: 'text-right',
    },
  },
  {
    accessorKey: 'counterpartName',
    header: 'Counterpart Name',
  },
];
