import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const textareaVariants = cva(
  'eb-leading-7 eb-text-gray-900  sm:eb-tracking-tight',
  {
    variants: {
      size: {
        sm: `eb-text-sm`,
        md: `eb-text-base`,
        lg: `eb-text-lg`,
        xl: `eb-text-xl`,
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.HTMLAttributes<HTMLTextAreaElement> &
    VariantProps<typeof textareaVariants>
>(({ className, asChild, size, children, ...props }: any, ref) => (
  <textarea
    ref={ref}
    className={cn(textareaVariants({ size }), className)}
    {...props}
  >
    {children}
  </textarea>
));
TextArea.displayName = 'TextArea';

export { TextArea };
