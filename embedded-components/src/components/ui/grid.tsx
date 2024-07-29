import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const gridVariant = cva('eb-grid', {
  variants: {
    variant: {
      default: 'eb-bg-background eb-text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const Grid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof gridVariant>
>(({ className, variant, children, ...props }, ref) => (
  <div ref={ref} className={cn(gridVariant({ variant }), className)} {...props}>
    {children}
  </div>
));
Grid.displayName = 'Grid';

export { Grid };
