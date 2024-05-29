import { useMemo } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui';

const generateOptions = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => ({
    value: (end - i).toString(),
    label: (end - i).toString(),
  }));
};

interface iYearSelect {
  value?: string;
  onChange?: (value: string) => void;
  maxDate?: number;
  minDate?: number;
  disabled?: boolean;
}

const YearSelect = ({ maxDate, onChange, value }: iYearSelect) => {
  const maxYear = maxDate || new Date().getFullYear();
  const yearOptions = useMemo(() => generateOptions(1900, maxYear), [maxYear]);


  return (
    <Select
      onValueChange={(val: string) => {
        if (onChange) {
          onChange(val);
        }
      }}
      defaultValue={value}
      //
      //   {...(value ? { defaultValue: value } : {})}
    >
      <SelectTrigger>
        <SelectValue placeholder="YYYY" />
      </SelectTrigger>

      <SelectContent>
        {yearOptions?.map((items: any) => {
          return (
            <SelectItem value={items.value} key={items.value}>
              {items.value}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export { YearSelect };
