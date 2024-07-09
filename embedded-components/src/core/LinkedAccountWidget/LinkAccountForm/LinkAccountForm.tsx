import { FC, ReactNode, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2Icon, CheckCircleIcon, Loader2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateRecipient } from '@/api/generated/embedded-banking';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui';

import {
  LinkAccountFormDataType,
  LinkAccountFormSchema,
} from './LinkAccountForm.schema';

type LinkAccountFormDialogTriggerProps = {
  children: ReactNode;
};

export const LinkAccountFormDialogTrigger: FC<
  LinkAccountFormDialogTriggerProps
> = ({ children }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState('INDIVIDUAL'); // Default to INDIVIDUAL

  const form = useForm<LinkAccountFormDataType>({
    resolver: zodResolver(LinkAccountFormSchema),
    defaultValues: {
      accountType: 'INDIVIDUAL',
      firstName: '',
      lastName: '',
      routingNumber: '',
      accountNumber: '',
    },
  });

  const handleAccountTypeChange = (accountType: string) => {
    setSelectedAccountType(accountType);
  };

  const {
    mutate: createRecipient,
    reset: resetCreateRecipient,
    status: createRecipientStatus,
    data: createRecipientResponse,
  } = useCreateRecipient();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (data: z.infer<typeof LinkAccountFormSchema>) => {
    // Handle account linking logic here
    createRecipient({
      data: {
        type: 'LINKED_ACCOUNT',
        partyDetails: {
          type: data.accountType,
          ...(data.accountType === 'INDIVIDUAL'
            ? {
                firstName: data.firstName,
                lastName: data.lastName,
              }
            : {
                businessName: data.businessName,
              }),
        },
        account: {
          type: 'CHECKING',
          number: data.accountNumber,
          routingNumber: data.routingNumber,
          countryCode: 'US',
          routingCodeType: 'USABA',
        },
      },
    });
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (open) {
          resetCreateRecipient();
          form.reset();
        }
        setDialogOpen(open);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="eb-max-h-[min(60rem,100vh)] eb-max-w-[30rem] eb-gap-4 eb-px-0 eb-pb-0">
        <DialogHeader className="eb-px-6">
          <DialogTitle>Link an account</DialogTitle>
          <DialogDescription>
            Enter your external account&apos;s information to link it
          </DialogDescription>
        </DialogHeader>
        {createRecipientStatus === 'pending' ? (
          <div className="eb-flex eb-h-[25rem] eb-items-center eb-justify-center eb-border-t-2">
            <Loader2Icon
              className="eb-animate-spin eb-stroke-primary"
              size={48}
            />
          </div>
        ) : createRecipientStatus === 'success' ? (
          <div>
            <div className="eb-flex eb-h-80 eb-items-center eb-justify-center eb-border-t-2">
              <div className="eb-grid eb-gap-2">
                <CheckCircle2Icon
                  className="eb-justify-self-center eb-stroke-green-600"
                  size={72}
                />
                <p className="eb-justify-self-center eb-text-lg eb-font-medium">
                  Success!
                </p>

                <div className="eb-mt-8 eb-space-y-1 eb-border eb-p-2">
                  <div className="eb-flex eb-items-center eb-justify-between eb-gap-4 eb-rounded-lg">
                    <h4
                      key={createRecipientResponse.id}
                      className="eb-text-sm eb-font-medium eb-leading-none"
                    >
                      {createRecipientResponse.partyDetails.type ===
                      'INDIVIDUAL'
                        ? [
                            createRecipientResponse.partyDetails.firstName,
                            createRecipientResponse.partyDetails.lastName,
                          ].join(' ')
                        : createRecipientResponse.partyDetails.businessName}
                      {` (...${createRecipientResponse.account.number.slice(-4)})`}
                    </h4>
                    <Badge>{createRecipientResponse.status}</Badge>
                  </div>
                  <p className="eb-text-sm eb-text-muted-foreground">
                    {createRecipientResponse.partyDetails.type.toLocaleUpperCase()}
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter className="eb-mx-6 eb-my-4 eb-gap-2">
              <DialogClose asChild>
                <Button>Done</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ScrollArea className="eb-max-h-[calc(min(60rem,100vh)-5.5rem)] eb-border-t-2">
                <div className="eb-grid eb-gap-2 eb-px-6 eb-pt-4">
                  <FormField
                    control={form.control}
                    name="accountType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Type</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleAccountTypeChange(value);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select account type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="INDIVIDUAL">
                              Individual
                            </SelectItem>
                            <SelectItem value="ORGANIZATION">
                              Business
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedAccountType === 'INDIVIDUAL' && (
                    <div className="eb-grid eb-grid-flow-col eb-justify-stretch eb-gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {selectedAccountType === 'ORGANIZATION' && (
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="routingNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Routing Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter className="eb-mx-6 eb-my-4 eb-gap-2">
                  <DialogClose asChild>
                    <Button variant="secondary">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Link Account</Button>
                </DialogFooter>
              </ScrollArea>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
