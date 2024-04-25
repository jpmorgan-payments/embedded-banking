import { EntityTypeForm } from './EntityTypeForm';

export default {
  title: 'EntityTypeForm',
};

export const Usage = () => (
  <EntityTypeForm
    onSubmit={(val: any) => {
      console.log('@@submit', val);
    }}
  />
);
