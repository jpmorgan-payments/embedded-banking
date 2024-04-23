import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const titleVariants = cva(
  'eb-text-2xl eb-font-bold eb-leading-7 eb-text-gray-900 sm:eb-truncate sm:eb-text-3xl sm:eb-tracking-tight',
  {
    variants: {
      variant: {
        default: 'eb-bg-background eb-text-foreground',
        destructive: ``,
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type tHeadingElement = React.ElementRef<'h1'>;
type tTitle = {
  as: React.ElementType;
  asChild?: boolean;
};

const Title = React.forwardRef<
  tHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> &
    VariantProps<typeof titleVariants> &
    tTitle
>(
  (
    { className, variant, asChild, as: Tag = 'h1', children, ...props },
    ref
  ) => (
    <Slot
      ref={ref}
      role="alert"
      className={cn(titleVariants({ variant }), className)}
      {...props}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot>
  )
);
Title.displayName = 'Title';

export { Title };
