import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useSmbdoPostClients } from '@/api/generated/embedded-banking';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useStepper } from '@/components/ui/stepper';

import { FormActions } from '../FormActions/FormActions';
import { translateApiErrorsToFormErrors } from '../utils';
import { InitialFormSchema } from './InitialStepForm.schema';

export const InitialStepForm = () => {
  const { nextStep } = useStepper();

  const form = useForm<z.infer<typeof InitialFormSchema>>({
    resolver: zodResolver(InitialFormSchema),
    defaultValues: {
      organizationName: '',
      organizationType: 'ORGANIZATION',
    },
  });

  // const onSubmit = () => {
  //   nextStep();
  // };

  const { mutate: postClient, status: postClientStatus } = useSmbdoPostClients({
    mutation: {
      onError: (error) => {
        form.setError('root.serverError', {
          message: error.response?.data?.title ?? 'Server Error',
          type: `${error.response?.data?.httpStatus ?? error.status}`,
        });

        if (error.response?.data?.context) {
          const { context } = error.response.data;
          const apiFormErrors = translateApiErrorsToFormErrors(context, 0);

          apiFormErrors.forEach((formError) => {
            if (formError.field === undefined) {
              form.setError('root.unhandled', {
                message: `${
                  form.formState.errors.root?.unhandled?.message ?? ''
                }\n${formError.path}: ${formError.message}`,
              });
            } else {
              form.setError(formError.field, {
                message: `Server Error: ${formError.message}`,
              });
            }
          });
        }
      },
    },
  });

  const onSubmit = () => {
    const { organizationName } = form.getValues();

    postClient({
      data: {
        parties: [
          {
            partyType: 'ORGANIZATION',
            roles: ['CLIENT'],
            organizationDetails: {
              organizationName,
            },
          },
        ],
        products: ['EMBEDDED_PAYMENTS'],
      },
    });
  };

  const unhandledServerErrors =
    form.formState.errors.root?.unhandled?.message?.split('\n');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="eb-space-y-6">
        <FormField
          control={form.control}
          name="organizationName"
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>Organization name</FormLabel>
              <FormDescription>
                The organization&apos;s legal name. It is the official name of
                the person or entity that owns a company. Must be the name used
                on the legal party&apos;s government forms and business
                paperwork.
              </FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root?.serverError && (
          <Alert variant="destructive">
            <AlertCircle className="eb-h-4 eb-w-4" />
            <AlertTitle>
              {form.formState.errors.root?.serverError?.message}
            </AlertTitle>
            <AlertDescription>
              {form.formState.errors.root?.serverError?.type === '400'
                ? 'There was an issue with the submitted data. Please fix any errors.'
                : 'An unexpected error occurred. Please try again later.'}
            </AlertDescription>
            {unhandledServerErrors && (
              <>
                <AlertDescription className="eb-mt-2 eb-font-semibold">
                  Unhandled errors:
                </AlertDescription>
                {unhandledServerErrors.map((error) => (
                  <AlertDescription key={error} className="eb-text-red-600">
                    {error}
                  </AlertDescription>
                ))}
              </>
            )}
          </Alert>
        )}
        <FormActions />
      </form>
    </Form>
  );
};
