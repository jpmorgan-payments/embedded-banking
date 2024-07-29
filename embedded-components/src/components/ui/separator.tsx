import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/lib/utils';

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    {
      className,
      orientation = 'horizontal',
      decorative = true,
      children,
      ...props
    },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'eb-shrink-0 eb-bg-border',
        orientation === 'horizontal'
          ? 'eb-h-[1px] eb-w-full'
          : 'eb-h-full eb-w-[1px]',
        className
      )}
      {...props}
    >
      {children}
    </SeparatorPrimitive.Root>
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
