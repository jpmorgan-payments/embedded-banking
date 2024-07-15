import { forwardRef } from 'react';
import { NumberFormatValues, PatternFormat } from 'react-number-format';

import { Input } from '../ui';

// import { useContentData } from '../../contexts/ContentProvider/useContentData';

// type PhoneInputProps = Omit<HTMLInputElement, 'placeholder'> &
//   Omit<NumericFormatProps, 'customInput' | 'placeholder'>;
//TODO: Investigate wearnings
// https://github.com/radix-ui/primitives/issues/1013

const PhoneInput = forwardRef<any, any>((props, fRef) => {
  const { onChange, ...rest } = props;
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
      {...rest}
      ref={fRef}
    />
  );
});

export { PhoneInput };
