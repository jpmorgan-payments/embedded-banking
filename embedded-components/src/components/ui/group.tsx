import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const groupVariants = cva('eb-flex eb-flex-row', {
  variants: {
    variant: {
      default: 'eb-bg-background eb-text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const Group = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof groupVariants>
>(({ className, variant, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(groupVariants({ variant }), className)}
    {...props}
  >
    {children}
  </div>
));
Group.displayName = 'Group';

export { Group };
