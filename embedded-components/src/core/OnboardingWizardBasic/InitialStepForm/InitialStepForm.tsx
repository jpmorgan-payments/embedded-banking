import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ErrorType } from '@/api/axios-instance';
import { useSmbdoPostClients } from '@/api/generated/embedded-banking';
import { ApiErrorReasonV2 } from '@/api/generated/embedded-banking.schemas';
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

const InitialFormSchema = z.object({
  organizationName: z.string().min(1, 'Organization name is required'),
});

export const InitialStepForm = () => {
  const { nextStep } = useStepper();

  const form = useForm<z.infer<typeof InitialFormSchema>>({
    resolver: zodResolver(InitialFormSchema),
    defaultValues: {
      organizationName: '',
    },
  });

  // const onSubmit = () => {
  //   nextStep();
  // };

  const { mutate: postClient, status: postClientStatus } = useSmbdoPostClients({
    mutation: {
      onError: (error) => {
        form.setError('organizationName', {
          type: 'custom',
          message: 'this is a test',
        });
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
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormActions />
      </form>
    </Form>
  );
};
