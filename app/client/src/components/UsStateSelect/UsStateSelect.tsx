import { NativeSelect, NativeSelectProps, SelectItem } from '@mantine/core';
import { UsaStates } from 'usa-states';

const usStates = new UsaStates();

type UsStateSelectProps = Omit<NativeSelectProps, 'data'>;

export const UsStateSelect = (props: UsStateSelectProps) => {
  return (
    <NativeSelect
      label="State"
      placeholder="State"
      data={
        usStates.format({
          value: 'abbreviation',
          label: 'name',
        }) as SelectItem[]
      }
      {...props}
    />
  );
};
