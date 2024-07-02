import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const StackVariants = cva('eb-flex eb-flex-col', {
  variants: {
    variant: {
      default: 'eb-bg-background eb-text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const Stack = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof StackVariants>
>(({ className, variant, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(StackVariants({ variant }), className)}
    {...props}
  >
    {children}
  </div>
));
Stack.displayName = 'Stack';

export { Stack };
