import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'eb-inline-flex eb-items-center eb-rounded-full eb-border eb-border-border eb-px-2.5 eb-py-0.5 eb-text-xs eb-font-semibold eb-transition-colors focus:eb-outline-none focus:eb-ring-2 focus:eb-ring-ring focus:eb-ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'hover:eb-bg-primary/80 eb-border-transparent eb-bg-primary eb-text-primary-foreground',
        secondary:
          'hover:eb-bg-secondary/80 eb-border-transparent eb-bg-secondary eb-text-secondary-foreground',
        destructive:
          'hover:eb-bg-destructive/80 eb-border-transparent eb-bg-destructive eb-text-destructive-foreground',
        outline: 'eb-text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
