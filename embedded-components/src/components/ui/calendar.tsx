import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('eb-p-3', className)}
      classNames={{
        months: 'eb-flex eb-flex-col sm:eb-flex-row eb-space-y-4 sm:eb-space-x-4 sm:eb-space-y-0',
        month: 'eb-space-y-4',
        caption: 'eb-flex eb-justify-center eb-pt-1 eb-relative eb-items-center',
        caption_label: 'eb-text-sm eb-font-medium',
        nav: 'eb-space-x-1 eb-flex eb-items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'eb-h-7 eb-w-7 eb-bg-transparent eb-p-0 eb-opacity-50 hover:eb-opacity-100'
        ),
        nav_button_previous: 'eb-absolute eb-left-1',
        nav_button_next: 'eb-absolute eb-right-1',
        table: 'eb-w-full eb-border-collapse eb-space-y-1',
        head_row: 'eb-flex',
        head_cell: 'eb-text-muted-foreground eb-rounded-md eb-w-9 eb-font-normal eb-text-[0.8rem]',
        row: 'eb-flex eb-w-full eb-mt-2',
        cell: 'eb-h-9 eb-w-9 eb-text-center eb-text-sm eb-p-0 eb-relative [&:has([aria-selected].day-range-end)]:eb-rounded-r-md [&:has([aria-selected].day-outside)]:eb-bg-accent/50 [&:has([aria-selected])]:eb-bg-accent first:[&:has([aria-selected])]:eb-rounded-l-md last:[&:has([aria-selected])]:eb-rounded-r-md focus-within:eb-relative focus-within:eb-z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'eb-h-9 eb-w-9 eb-p-0 eb-font-normal aria-selected:eb-opacity-100'
        ),
        day_range_end: 'eb-day-range-end',
        day_selected:
          'eb-bg-primary eb-text-primary-foreground hover:eb-bg-primary hover:eb-text-primary-foreground focus:eb-bg-primary focus:eb-text-primary-foreground',
        day_today: 'eb-bg-accent eb-text-accent-foreground',
        day_outside:
          'eb-day-outside eb-text-muted-foreground eb-opacity-50 aria-selected:eb-bg-accent/50 aria-selected:eb-text-muted-foreground aria-selected:eb-opacity-30',
        day_disabled: 'eb-text-muted-foreground eb-opacity-50',
        day_range_middle: 'aria-selected:eb-bg-accent aria-selected:eb-text-accent-foreground',
        day_hidden: 'eb-invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="eb-h-4 eb-w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="eb-h-4 eb-w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
