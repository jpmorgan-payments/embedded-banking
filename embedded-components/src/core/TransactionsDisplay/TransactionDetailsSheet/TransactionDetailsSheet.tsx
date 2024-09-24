import { FC } from 'react';
import { CopyIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui';

import { formatNumberToCurrency } from '../utils/formatNumberToCurrency';
import { ModifiedTransaction } from '../utils/modifyTransactionsData';

export type TransactionDetailsSheetTriggerProps = {
  children: React.ReactNode;
  transaction: ModifiedTransaction;
};

export const TransactionDetailsSheetTrigger: FC<
  TransactionDetailsSheetTriggerProps
> = ({ children, transaction }) => {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="eb-component eb-p-0">
        <SheetHeader className="eb-flex eb-space-y-1.5 eb-bg-muted/50 eb-p-6">
          <SheetTitle className="eb-group eb-flex eb-items-center eb-gap-2 eb-text-lg">
            Transaction: {transaction.id}
            <Button
              size="icon"
              variant="outline"
              className="eb-h-6 eb-w-6 eb-opacity-0 eb-transition-opacity group-hover:eb-opacity-100"
              onClick={() =>
                navigator.clipboard.writeText(transaction.id ?? '')
              }
            >
              <CopyIcon className="eb-h-3 eb-w-3" />
              <span className="eb-sr-only">Copy transaction ID</span>
            </Button>
          </SheetTitle>
          <SheetDescription>
            Date:{' '}
            {transaction.paymentDate === undefined
              ? 'N/A'
              : new Date(transaction.paymentDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
          </SheetDescription>
          <SheetDescription>Status: {transaction.status}</SheetDescription>
        </SheetHeader>
        <div className="eb-p-6 eb-text-sm">
          <div className="eb-grid eb-gap-3">
            <div className="eb-font-semibold">Transaction Details</div>
            <ul className="eb-grid eb-gap-3">
              <li className="eb-flex eb-items-center eb-justify-between">
                <span className="eb-text-muted-foreground">Amount</span>
                <span>
                  {transaction.amount
                    ? formatNumberToCurrency(
                        transaction.amount,
                        transaction.currency ?? 'USD'
                      )
                    : 'N/A'}
                </span>
              </li>
              <li className="eb-flex eb-items-center eb-justify-between">
                <span className="eb-text-muted-foreground">Currency</span>
                <span>{transaction.currency}</span>
              </li>
              <li className="eb-flex eb-items-center eb-justify-between">
                <span className="eb-text-muted-foreground">Type</span>
                <span>{transaction.type}</span>
              </li>
            </ul>
          </div>

          <Separator className="eb-my-4" />
        </div>
      </SheetContent>
    </Sheet>
  );
};
