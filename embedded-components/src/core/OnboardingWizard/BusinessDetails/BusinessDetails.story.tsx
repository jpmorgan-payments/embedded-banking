import { BusinessDetails } from './BusinessDetails';

export default {
  title: 'BusinessDetails',
};

export const Usage = () => (
  <BusinessDetails
    onSubmit={(val: any) => {
      console.log('@@submit', val);
    }}
  />
);
