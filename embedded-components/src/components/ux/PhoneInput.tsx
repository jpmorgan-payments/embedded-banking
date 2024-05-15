import { NumberFormatValues, PatternFormat } from 'react-number-format';

import { Input } from '../ui';

// import { useContentData } from '../../contexts/ContentProvider/useContentData';

// type PhoneInputProps = Omit<HTMLInputElement, 'placeholder'> &
//   Omit<NumericFormatProps, 'customInput' | 'placeholder'>;

export function PhoneInput({ onChange, ...props }: any) {
  return (
    <PatternFormat
      customInput={Input}
      format="+1 (###) ###-####"
      allowEmptyFormatting
      mask="_"
      onValueChange={(event: NumberFormatValues) => {
        if (event?.value) {
          onChange?.(event.value);
        }
      }}
      {...props}
    />
  );
}
