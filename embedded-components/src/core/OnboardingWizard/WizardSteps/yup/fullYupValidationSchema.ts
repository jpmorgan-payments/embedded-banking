import { businessOwnersValidation } from './businessOwnersValidation.schema';
import { individualValidation } from './individualValidation.schema';
import { organizationValidation } from './organizationValidation.schema';

export const fullYupValidationSchema: any = (getContentToken: any) => {
  return {
    ...individualValidation(getContentToken),
    ...organizationValidation(getContentToken),
    ...businessOwnersValidation(getContentToken),
  };
};
