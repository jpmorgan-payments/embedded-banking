import * as yup from 'yup';

const validationSchema = yup.object({
  amount: yup.string().default('').required(),
  accountId: yup.string().default('').required(),
  paymentMethod: yup.string().default('').required(),
  recipientId: yup.string().default('').required(),
  date: yup.date().default(new Date()).required(),
});

export { validationSchema };
