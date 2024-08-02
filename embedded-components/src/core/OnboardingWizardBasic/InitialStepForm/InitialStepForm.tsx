import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  useSmbdoGetClient,
  useSmbdoPostClients,
} from '@/api/generated/embedded-banking';
import { CreateClientRequest } from '@/api/generated/embedded-banking.schemas';
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
import { useOnboardingContext } from '../OnboardingContextProvider/OnboardingContextProvider';
import { generateRequestBody, translateApiErrorsToFormErrors } from '../utils';
import { InitialFormSchema } from './InitialStepForm.schema';

export const InitialStepForm = () => {
  const { nextStep } = useStepper();
  const { clientId } = useOnboardingContext();

  const { data: clientData, status: clientGetStatus } = useSmbdoGetClient(
    clientId ?? '',
    {
      query: {
        enabled: !!clientId,
      },
    }
  );

  const form = useForm<z.infer<typeof InitialFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(InitialFormSchema),
    defaultValues: {
      organizationName: '',
      organizationType: 'C_CORPORATION',
      countryOfFormation: '',
    },
  });

  useEffect(() => {
    if (clientGetStatus === 'success' && clientData) {
      console.log(clientData);
      // form.reset(clientData)
    }
  }, [clientGetStatus, JSON.stringify(clientData)]);

  const { mutate: postClient } = useSmbdoPostClients({
    mutation: {
      onSuccess: () => {
        nextStep();
        // TODO: add success toast
      },
      onError: (error, { data }) => {
        form.setError('root.serverError', {
          message: error.response?.data?.title ?? 'Server Error',
          type: `${error.response?.data?.httpStatus ?? error.status}`,
        });

        if (error.response?.data?.context) {
          const { context } = error.response.data;
          // determine partyindex from request
          const partyIndex = data.parties?.findIndex(
            (party) => party.partyType === 'ORGANIZATION'
          );
          const apiFormErrors = translateApiErrorsToFormErrors(
            context,
            partyIndex ?? 0
          );

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

  const onSubmit = form.handleSubmit((values) => {
    const requestBody = generateRequestBody(
      values,
      {
        products: ['EMBEDDED_PAYMENTS'],
        parties: [
          {
            partyType: 'ORGANIZATION',
            roles: ['CLIENT'],
          },
        ],
      },
      0
    ) as CreateClientRequest;

    postClient({
      data: requestBody,
    });
  });

  const unhandledServerErrors =
    form.formState.errors.root?.unhandled?.message?.split('\n');

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="eb-space-y-6">
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

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>Organization email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="organizationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>Organization type</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="countryOfFormation"
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>Country of formation</FormLabel>
              <FormDescription>Country code in alpha-2 format</FormDescription>
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
