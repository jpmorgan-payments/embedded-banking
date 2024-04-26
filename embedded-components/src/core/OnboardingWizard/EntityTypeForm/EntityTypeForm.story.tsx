import { EntityTypeForm } from './EntityTypeForm';

export default {
  title: 'EntityTypeForm',
};

export const Usage = () => (
  <EntityTypeForm
  activeStep={0} setActiveStep={()=> {}} 
    onSubmit={(val: any) => {
      console.log('@@submit', val);
    }}
  />
);
