import { individualValidation } from './individualValidation.schema';
import { organizationValidation } from './organizationValidation.schema';

// TODO: Separate the files into better utils
export const fullYupValidationSchema: any = (getContentToken: any) => {
  return {
    ...individualValidation(getContentToken),
    ...organizationValidation(getContentToken),
  };
};
