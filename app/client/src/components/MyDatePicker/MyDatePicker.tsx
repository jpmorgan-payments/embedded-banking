import { DateInput, DateInputProps } from '@mantine/dates';

export const MyDatePicker = (props: DateInputProps) => {
  return <DateInput label="Date of birth" placeholder="Pick date" {...props} />;
};
