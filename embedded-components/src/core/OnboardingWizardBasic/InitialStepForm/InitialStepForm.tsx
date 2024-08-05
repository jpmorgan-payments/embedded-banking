import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useSmbdoPostClients } from '@/api/generated/embedded-banking';
import { CreateClientRequestSmbdo } from '@/api/generated/embedded-banking.schemas';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
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

import { ServerErrorAlert } from '../ServerErrorAlert/ServerErrorAlert';
import {
  generateRequestBody,
  setApiFormErrors,
  translateApiErrorsToFormErrors,
} from '../utils/formUtils';
import { InitialFormSchema } from './InitialStepForm.schema';

export const InitialStepForm = () => {
  const { nextStep } = useStepper();

  // Create a form with empty default values
  const form = useForm<z.infer<typeof InitialFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(InitialFormSchema),
    defaultValues: {
      organizationName: '',
      organizationType: 'C_CORPORATION',
      countryOfFormation: '',
    },
  });

  const { mutate: postClient, error: postClientError } = useSmbdoPostClients({
    mutation: {
      onSuccess: (response) => {
        nextStep();
        toast.success(`Client created successfully with ID: ${response.id}`);
      },
      onError: (error) => {
        if (error.response?.data?.context) {
          const { context } = error.response.data;
          const apiFormErrors = translateApiErrorsToFormErrors(context, 0);
          setApiFormErrors(form, apiFormErrors);
        }
      },
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    const requestBody = generateRequestBody(values, 0, {
      products: ['EMBEDDED_PAYMENTS'],
      parties: [
        {
          partyType: 'ORGANIZATION',
          roles: ['CLIENT'],
        },
      ],
    }) as CreateClientRequestSmbdo;

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

        {postClientError && (
          <ServerErrorAlert
            error={postClientError}
            customErrorMessage={{
              '400':
                'There was an issue with the submitted data. Please fix any errors.',
            }}
          />
        )}

        {unhandledServerErrors && (
          <Alert variant="destructive">
            <AlertCircle className="eb-h-4 eb-w-4" />
            <AlertTitle>Unhandled errors</AlertTitle>
            {unhandledServerErrors.map((error) => (
              <AlertDescription key={error} className="eb-text-red-600">
                {error}
              </AlertDescription>
            ))}
          </Alert>
        )}

        <div className="eb-flex eb-w-full eb-justify-end eb-gap-4">
          <Button>Submit</Button>
        </div>
      </form>
    </Form>
  );
};
