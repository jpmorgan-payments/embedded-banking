import * as yup from 'yup';

export const businessOwnersValidation: any = (getContentToken: any) => {
  return {
    significantOwnership: yup
      .boolean()
      .required(getContentToken ?? 'Required field'),
  };
};
