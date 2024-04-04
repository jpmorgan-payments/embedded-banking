import { Card } from '@/components/ui/card';

const data = [
  { label: 'Transaction ID', value: '123' },
  { label: 'Status', value: 'Pending' },
  { label: 'Type', value: 'Payout' },
  { label: 'Amount', value: '-$30.00' },
  { label: 'Debit / Credit', value: 'DR' },
  { label: 'Currency', value: 'USD' },
  { label: 'Memo', value: '--' },
  { label: 'Date', value: '2/22/2024' },
  { label: 'Recipient', value: 'John Doe' },
  { label: 'Account numberss', value: '...1234' },
];


export const PaymentDetails = () => (
  <Card>
    {data?.map(({ label }) => (
      <p key={label}>{label}</p>
    ))}
  </Card>
);
