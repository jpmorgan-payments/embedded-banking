import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'eb-flex eb-h-10 eb-w-full eb-rounded-md  eb-border eb-border-border eb-border-input eb-bg-background eb-px-3 eb-py-2 eb-text-foreground eb-text-sm eb-ring-offset-background file:eb-border-0 file:eb-bg-transparent file:eb-text-sm file:eb-font-medium placeholder:eb-text-muted-foreground focus-visible:eb-outline-none focus-visible:eb-outline-primary focus-visible:eb-ring-offset-1 focus-visible:eb-ring-1  focus-visible:eb-ring-offset-1 focus-visible:eb-default disabled:eb-cursor-not-allowed disabled:eb-opacity-50 disabled:eb-bg-gray-100',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
