import React, { useEffect, useMemo, useState } from 'react';

import {
  Group,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui';

// TODO: Upon upgrading to Mantine 7, update the Select components to
// use selectFirstOptionOnChange and clean up styles

interface DateSelectorProps {
  value?: Date;
  onChange?: (value: Date) => void;
  maxDate?: Date;
  disabled?: boolean;
  format?: 'DMY' | 'YMD' | 'MDY';
  separator?: React.ReactNode;
  getContentToken: any;
}

export function BirthDateSelector({
  value,
  onChange,
  maxDate,
  //   disabled = false,
  format = 'MDY',
  separator = '/',
  getContentToken,
  ...props
}: DateSelectorProps) {
  const [day, setDay] = useState(value ? value.getDate().toString() : '');
  const [month, setMonth] = useState(
    value ? (value.getMonth() + 1).toString() : ''
  );
  const [year, setYear] = useState(value ? value.getFullYear().toString() : '');
  console.log('@@value', value, year);

  // Update internal stat when selectedDate changes
  useEffect(() => {
    if (value) {
      setDay(value.getDate().toString());
      setMonth((value.getMonth() + 1).toString());
      setYear(value.getFullYear().toString());
    }
  }, [value]);

  useEffect(() => {
    if (onChange) {
      if (day && month && year) {
        const newDate = new Date(
          parseInt(year, 10),
          parseInt(month, 10) - 1,
          parseInt(day, 10)
        );
        if (!value || newDate.getTime() !== value.getTime()) {
          if (maxDate && newDate > maxDate) {
            onChange(maxDate);
          } else {
            onChange(newDate);
          }
        }
      } else if (value) {
        // onChange(undefined);
      }
    }
  }, [day, month, year, onChange, maxDate, value]);

  const maxYear = maxDate ? maxDate.getFullYear() : new Date().getFullYear();

  const getDaysInMonth = (y: number, m: number) => {
    return new Date(y, m, 0).getDate();
  };

  const generateOptions = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => ({
      value: (end - i).toString(),
      label: (end - i).toString(),
    }));
  };

  const dayOptions = useMemo(
    () =>
      generateOptions(1, month && year ? getDaysInMonth(+year, +month) : 31),
    [month, year, getDaysInMonth]
  );
  const monthOptions = useMemo(() => generateOptions(1, 12), []);
  const yearOptions = useMemo(() => generateOptions(1900, maxYear), [maxYear]);

  const renderSelect = (type: 'D' | 'Y' | 'M' | string) => {
    switch (type) {
      case 'D':
        return (
          <>
            <Select
              onValueChange={(val: string) => {
                setDay(val);
              }}
              defaultValue={day}
            >
              <SelectTrigger>
                <SelectValue placeholder="D" />
              </SelectTrigger>

              <SelectContent>
                {dayOptions?.map((items: any) => {
                  return (
                    <SelectItem value={items.value} key={items.value + 'D'}>
                      {items.value}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </>
        );

      case 'M':
        return (
          <>
            <Select
              onValueChange={(val: string) => {
                setMonth(val);
              }}
              defaultValue={month}
            >
              <SelectTrigger>
                <SelectValue placeholder="M" />
              </SelectTrigger>

              <SelectContent>
                {monthOptions?.map((items: any) => {
                  return (
                    <SelectItem value={items.value} key={items.value + 'M'}>
                      {items.value}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </>
        );

      case 'Y':
        return (
          <>
            <Select
              onValueChange={(val: string) => {
                setYear(val);
              }}
              defaultValue={year}
            >
              <SelectTrigger>
                <SelectValue placeholder="Y" />
              </SelectTrigger>

              <SelectContent>
                {yearOptions?.map((items: any) => {
                  return (
                    <SelectItem value={items.value} key={items.value + 'Y'}>
                      {items.value}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </>
        );

      default:
        return <></>;
    }
  };

  return (
    <>
      <Input {...props} className="eb-hidden" />
      <Group className='eb-align-baseline'>
        {format.split('').map((type, index) => (
          <React.Fragment key={type}>
            {renderSelect(type)}
            {index < format.length - 1 && <span>{separator}</span>}
          </React.Fragment>
        ))}
      </Group>
    </>
  );
}
