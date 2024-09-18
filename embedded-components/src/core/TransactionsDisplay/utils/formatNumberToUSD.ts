export const { format: formatNumberToUSD } = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
