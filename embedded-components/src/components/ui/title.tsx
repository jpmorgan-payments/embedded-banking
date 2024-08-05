import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const titleVariants = cva(
  'eb-font-bold eb-leading-7 eb-text-gray-900 sm:eb-truncate sm:eb-tracking-tight',
  {
    variants: {
      as: {
        h5: `eb-text-sm`,
        h4: `eb-text-lg`,
        h3: `eb-text-xl`,
        h2: `eb-text-2xl`,
        h1: `eb-text-3xl`,
      },
    },
    defaultVariants: {
      as: 'h3',
    },
  }
);

type tHeadingElement = React.ElementRef<'h1'>;
type tTitle = {
  asChild?: boolean;
};

const Title = React.forwardRef<
  tHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> &
    VariantProps<typeof titleVariants> &
    tTitle
>(({ className, asChild, as: Tag, children, ...props }: any, ref) => (
  <Slot
    ref={ref}
    className={cn(titleVariants({ as: Tag }), className)}
    {...props}
  >
    {asChild ? children : <Tag>{children}</Tag>}
  </Slot>
));
Title.displayName = 'Title';

export { Title };
