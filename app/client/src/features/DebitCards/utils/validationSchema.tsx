import * as yup from 'yup';

const validationSchema = yup.object({
  account: yup.string().default('').required(),
  party: yup.string().default('').required(),
});

export { validationSchema };
