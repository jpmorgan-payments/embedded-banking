import { TextInput, type TextInputProps } from '@mantine/core';
import NumberFormat, { type NumberFormatProps } from 'react-number-format';

type SsnInputProps = Omit<TextInputProps, 'placeholder'> &
  Omit<NumberFormatProps, 'customInput' | 'placeholder'>;

export const Ssn4Input = ({ onChange, ...props }: SsnInputProps) => {
  return (
    <NumberFormat
      customInput={TextInput}
      label="Social Security Number"
      format="XXX - XX - ####"
      allowEmptyFormatting
      mask="_"
      onValueChange={({ value }, { event }) => {
        event.currentTarget.value = value;
        onChange?.(event);
      }}
      {...props}
    />
  );
};

export const Ssn9Input = (props: SsnInputProps) => {
  return <Ssn4Input format="### - ## - ####" {...props} />;
};
