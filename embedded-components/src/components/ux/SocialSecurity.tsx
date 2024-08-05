import { NumberFormatValues, PatternFormat } from 'react-number-format';

import { Input } from '../ui';

export function Ssn4Input({ onChange, ...props }: any) {
  return (
    <PatternFormat
      customInput={Input}
      format="XXX - XX - ####"
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

export function Ssn9Input(props: any) {
  return <Ssn4Input format="### - ## - ####" {...props} />;
}
