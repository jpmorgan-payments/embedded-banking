import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const swithcVariants = cva('', {
  variants: {
    variant: {
      default: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> &
    VariantProps<typeof swithcVariants>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'eb-focus-visible:outline-none eb-focus-visible:ring-2 eb-focus-visible:ring-ring eb-focus-visible:ring-offset-2 eb-focus-visible:ring-offset-background eb-disabled:cursor-not-allowed disabled:opacity-50 eb-data-[state=checked]:bg-primary eb-data-[state=unchecked]:bg-input eb-peer eb-inline-flex eb-h-5 eb-w-9 eb-shrink-0 eb-cursor-pointer eb-items-center eb-rounded-full eb-border-2 eb-border-transparent eb-shadow-sm eb-transition-colors',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'eb-data-[state=checked]:translate-x-4 eb-data-[state=unchecked]:translate-x-0 eb-pointer-events-none eb-block eb-h-4 eb-w-4 eb-rounded-full eb-bg-background eb-shadow-lg eb-ring-0 eb-transition-transform'
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
