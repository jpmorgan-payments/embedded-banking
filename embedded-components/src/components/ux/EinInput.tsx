import { NumberFormatValues, PatternFormat } from 'react-number-format';

import { Input } from '../ui';

export function EinInput({ onChange, ...props }: any) {
  if (props.disabled) {
    return <Input {...props} value="" placeholder="N/A" />;
  }
  return (
    <PatternFormat
      customInput={Input}
      format="## - #######"
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
