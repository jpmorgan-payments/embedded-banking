import { NumberFormatValues, PatternFormat } from 'react-number-format';

import { Input } from '../ui';

// import { useContentData } from '../../contexts/ContentProvider/useContentData';

// type PhoneInputProps = Omit<HTMLInputElement, 'placeholder'> &
//   Omit<NumericFormatProps, 'customInput' | 'placeholder'>;

export function BirthDatePattern({ onChange, ...props }: any) {
  return (
    <PatternFormat
      customInput={Input}
      format="##/##/####"
      //TODO:placeHolder content replacement
      placeholder="MM/DD/YYYY"
      mask={['M', 'M', 'D', 'D', 'Y', 'Y', 'Y', 'Y']}
    //   allowEmptyFormatting
      onValueChange={(event: NumberFormatValues) => {
        if (event?.value) {
          onChange?.(event.value);
        }
      }}
      {...props}
    />
  );
}
