import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useSmbdoPostClients } from '@/api/generated/smbdo';
import { CreateClientRequestSmbdo } from '@/api/generated/smbdo.schemas';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStepper } from '@/components/ui/stepper';

import { FormLoadingState } from '../FormLoadingState/FormLoadingState';
import { useOnboardingContext } from '../OnboardingContextProvider/OnboardingContextProvider';
import { ServerErrorAlert } from '../ServerErrorAlert/ServerErrorAlert';
import {
  generateRequestBody,
  setApiFormErrors,
  translateApiErrorsToFormErrors,
} from '../utils/formUtils';
import { InitialFormSchema } from './InitialForm.schema';

export const InitialForm = () => {
  const { nextStep } = useStepper();
  const { onPostClientResponse, setClientId } = useOnboardingContext();

  // Create a form with empty default values
  const form = useForm<z.infer<typeof InitialFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(InitialFormSchema),
    defaultValues: {
      organizationName: '',
      organizationType: undefined,
      countryOfFormation: '',
    },
  });

  const {
    mutate: postClient,
    error: postClientError,
    status: postClientStatus,
  } = useSmbdoPostClients({
    mutation: {
      onSettled: (data, error) => {
        onPostClientResponse?.(data, error?.response?.data);
      },
      onSuccess: (response) => {
        setClientId?.(response.id);
        toast.success(
          `Client created successfully with ID: ${response.id}`,
          {}
        );
        nextStep();
      },
      onError: (error) => {
        if (error.response?.data?.context) {
          const { context } = error.response.data;
          const apiFormErrors = translateApiErrorsToFormErrors(
            context,
            0,
            'parties'
          );
          setApiFormErrors(form, apiFormErrors);
        }
      },
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    const requestBody = generateRequestBody(values, 0, 'parties', {
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

  if (postClientStatus === 'pending') {
    return <FormLoadingState message="Creating client..." />;
  }

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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="LIMITED_LIABILITY_COMPANY">
                    Limited Liability Company
                  </SelectItem>
                  <SelectItem value="C_CORPORATION">C Corporation</SelectItem>
                  <SelectItem value="S_CORPORATION">S Corporation</SelectItem>
                  <SelectItem value="PARTNERSHIP">Partnership</SelectItem>
                  <SelectItem value="PUBLICLY_TRADED_COMPANY">
                    Publicly Traded Company
                  </SelectItem>
                  <SelectItem value="NON_PROFIT_CORPORATION">
                    Non-Profit Corporation
                  </SelectItem>
                  <SelectItem value="GOVERNMENT_ENTITY">
                    Government Entity
                  </SelectItem>
                  <SelectItem value="SOLE_PROPRIETORSHIP">
                    Sole Proprietorship
                  </SelectItem>
                  <SelectItem value="UNINCORPORATED_ASSOCIATION">
                    Unincorporated Association
                  </SelectItem>
                </SelectContent>
              </Select>
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

        <ServerErrorAlert error={postClientError} />

        <div className="eb-flex eb-w-full eb-justify-end eb-gap-4">
          <Button>Submit</Button>
        </div>
      </form>
    </Form>
  );
};
