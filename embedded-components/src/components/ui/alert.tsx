import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const alertVariants = cva(
  'eb-relative eb-w-full eb-rounded-lg eb-border eb-p-4 [&>svg~*]:eb-pl-7 [&>svg+div]:eb-translate-y-[-3px] [&>svg]:eb-absolute [&>svg]:eb-left-4 [&>svg]:eb-top-4 [&>svg]:eb-text-foreground',
  {
    variants: {
      variant: {
        default: 'eb-bg-background eb-text-foreground',
        destructive:
          'eb-border-destructive/50 eb-text-destructive dark:eb-border-destructive [&>svg]:eb-text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('eb-mb-1 eb-font-medium eb-leading-none eb-tracking-tight', className)}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('eb-text-sm [&_p]:eb-leading-relaxed', className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
