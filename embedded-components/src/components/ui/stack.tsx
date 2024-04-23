import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const titleVariants = cva('eb-flex eb-flex-col', {
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
  React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof titleVariants>
>(({ className, variant, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(titleVariants({ variant }), className)}
    {...props}
  >
    {children}
  </div>
));
Stack.displayName = 'Stack';

export { Stack };