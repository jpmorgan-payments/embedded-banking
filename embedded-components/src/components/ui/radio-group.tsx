import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';

import { cn } from '@/lib/utils';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(' eb-gap-2', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        `eb-aspect-square eb-h-4 eb-w-4 eb-rounded-full eb-border eb-border-primary eb-text-primary eb-ring-offset-background
         focus:eb-outline-none focus-visible:eb-ring-2 focus-visible:eb-ring-ring focus-visible:eb-ring-offset-2 disabled:eb-cursor-not-allowed disabled:eb-opacity-50`,
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="eb-flex eb-items-center eb-justify-center">
        <Circle className="eb-size-2.5 eb-fill-current teb-ext-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
