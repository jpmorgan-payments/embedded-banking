import * as React from 'react';
import * as Switchy from '@radix-ui/react-switch';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { Box } from './box';

const swithcVariants = cva('eb-flex eb-items-center', {
  variants: {
    variant: {
      default: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type tSwitch = {
  labelLeft: boolean;
  labelRight: boolean;
};

// TODO: something is odd with switch component, will require a second pass to investigate
const Switch = React.forwardRef<any>(
  //   React.ElementRef<any>,
  //   React.ComponentProps<typeof Switchy.Root> &
  //     VariantProps<typeof swithcVariants> &
  //     tSwitch
  ({ className, labelLeft, id, ...props }: any, ref) => (
    // TODO: fix type here
    // @ts-ignore
    //   <Box
    //     size="md"
    //     className={cn('eb-flex eb-items-center', className)}
    //     {...props}
    //   >

    <Switchy.Root
      className="eb-bg-blackA6 eb-shadow-blackA4 eb-focus:shadow-[0_0_0_2px] eb-focus:shadow-black eb-data-[state=checked]:bg-black eb-relative eb-h-[25px] eb-w-[42px] eb-cursor-default eb-rounded-full eb-shadow-[0_2px_10px] eb-outline-none"
      id={id}
    >
      <Switchy.Thumb className="eb-shadow-blackA4 eb-data-[state=checked]:translate-x-[19px] eb-block eb-h-[21px] eb-w-[21px] eb-translate-x-0.5 eb-rounded-full eb-bg-white eb-shadow-[0_2px_2px] eb-transition-transform eb-duration-100 eb-will-change-transform" />
    </Switchy.Root>
  )
);
Switch.displayName = Switchy.Root.displayName;

export { Switch };
