import { useCallback, useEffect, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Box, Button, Form, Text } from '@/components/ui';

import { useStepper } from './Stepper/useStepper';

export const OnboardingWizardFormRoot = ({
  title,
  schema,
  children,
  submit,
  ...props
}: any) => {
  const { activeStep } = useStepper();

  const validSchema = yup.object({});

  type validSchemaValues = yup.InferType<typeof validSchema>;

  const form = useForm<validSchemaValues>({
    resolver: yupResolver(validSchema),
    mode: 'onBlur',
  });

  const onSuby = useCallback(async () => {
    submit();
  }, [activeStep]);

  return (
    <>
      <Box className="eb-flex eb-items-center  eb-space-x-4 eb-rounded-md eb-border eb-p-5">
        <Form {...form}>
          <form noValidate onSubmit={form.handleSubmit(onSuby)}>
            {children}
          </form>
        </Form>
      </Box>
    </>
  );
};
