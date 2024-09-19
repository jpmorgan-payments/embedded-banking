import { TransactionGetResponseV2 } from '@/api/generated/ef-v2.schemas';

export interface TransformedTransaction extends TransactionGetResponseV2 {
  payinOrPayout?: 'PAYIN' | 'PAYOUT';
  counterpartName?: string;
}

export const modifyTransactionsData = (
  transactions: TransactionGetResponseV2[],
  accountId: string
): TransformedTransaction[] => {
  const sortedTransactions = transactions.sort(
    (a, b) =>
      new Date(b.effectiveDate ?? '').getTime() -
        new Date(a.effectiveDate ?? '').getTime() ||
      (b.postingVersion ?? 0) - (a.postingVersion ?? 0)
  );

  return sortedTransactions.map((transaction) => {
    const payinOrPayout =
      transaction.creditorAccountId === accountId ? 'PAYIN' : 'PAYOUT';
    const counterpartName =
      payinOrPayout === 'PAYIN'
        ? transaction.debtorName
        : transaction.creditorName;

    return {
      ...transaction,
      payinOrPayout,
      counterpartName,
    };
  });
};
